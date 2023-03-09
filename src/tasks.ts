#!/usr/bin/env node

// @ts-ignore
import homeOrTemp from "home-or-tmp";
import { copy, ensureDir } from "fs-extra";
import ora from "ora";
import { deleteAsync } from "del";
import { dir } from "tmp-promise";
import { appNameQuery } from "./appNameQuery.js";
import { checkRequirements } from "./checkRequirements.js";
import { tauriCreate } from "./tauri/create.js";
import { fetchManifest, fetchWebManifestFromPwaUrl, WebManifest } from "./fetchWebManifest.js";
import { pwaUrlQuery } from "./pwaUrlQuery.js";
import { tauriBuild } from "./tauri/build.js";
import { getWindowUrl, updateTauriConf } from "./tauri/config/index.js";
import { CliArguments } from "./cli.js";
import { manifestUrlQuery } from "./manifestUrlQuery.js";

export async function runTasks(options: CliArguments) {
  const spinner = ora("Loading @mrtnvh/pwa-to-tauri").start();

  try {
    // Check if Rust and Cargo are installed
    spinner.text = "Checking requirements...";
    await checkRequirements();
    spinner.stop();

    // Action: Ask for PWA URL, if no manifest is provided
    let pwaUrl: string | undefined = undefined;
    if (!options.manifestUrl) {
      await pwaUrlQuery().then((result) => {
        pwaUrl = result.pwaUrl;
      });
    }
    // const pwaUrl: string | undefined = options.manifestUrl ? (await pwaUrlQuery()).pwaUrl : undefined;

    // Action: Fetch web app manifest
    spinner.start();
    spinner.text = "Fetching web app manifest...";

    let manifest: WebManifest | undefined = undefined;
    let manifestUrl: string | undefined = undefined;

    if (!options.manifestUrl) {
      try {
        const manifestInfo = await fetchWebManifestFromPwaUrl(pwaUrl);
        manifest = manifestInfo.manifest;
        manifestUrl = manifestInfo.manifestUrl;
      } catch (error) {
        spinner.warn("Could not fetch web app manifest from PWA URL");
      }

      if (!manifest) {
        manifestUrl = (await manifestUrlQuery({ manifestUrl: options.manifestUrl })).manifestUrl;
        manifest = await fetchManifest(manifestUrl);
      }
    } else {
      manifest = await fetchManifest(options.manifestUrl);
      manifestUrl = options.manifestUrl;
    }

    if (!manifest || !manifestUrl) throw new Error("Could not fetch web app manifest");

    const url = getWindowUrl({ baseUrl: pwaUrl, startUrl: options.startUrl || manifest.start_url, manifestUrl });
    spinner.stop();

    // Ask for app name, if no name is provided
    const { appName } = await appNameQuery({ manifestAppName: options.name || manifest.name });

    // Action: Create temporary folder
    spinner.start();
    spinner.text = "Creating temporary folder...";
    const { path: tempDirPath } = await dir();

    // Action: Create Tauri project in the temporary folder
    spinner.text = "Creating Tauri project...";
    await tauriCreate(tempDirPath);

    // Action: Map URL and web app manifest to tauri.conf.json
    spinner.text = "Updating Tauri config...";
    await updateTauriConf({
      workDirPath: tempDirPath,
      url,
      title: appName,
      manifest,
    });

    // Build Tauri project
    spinner.text = "Building Tauri project...";
    await tauriBuild({ workDirPath: tempDirPath });

    // Action: Copy Tauri project to `~/Applications/PWA Tauri Apps/`
    spinner.text = "Copying Tauri project to user Applications folder...";
    const builtAppPath = `${tempDirPath}/src-tauri/target/release/bundle/macos/${appName}.app`;
    const appDir = `${homeOrTemp}/Applications/PWA Tauri Apps`;
    const appPath = `${appDir}/${appName}.app`;
    await ensureDir(appDir);
    await copy(builtAppPath, appPath);

    // Cleanup
    spinner.text = "Cleaning up...";
    // @ts-ignore
    await deleteAsync(tempDirPath, { force: true });

    spinner.succeed(`Done! ${appName} is now available in ${appDir}`);
  } catch (error) {
    // @ts-ignore
    spinner.fail(error.message);
  }
}
