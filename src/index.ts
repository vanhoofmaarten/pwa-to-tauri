#!/usr/bin/env node

// @ts-ignore
import homeOrTemp from "home-or-tmp";
import { copy, ensureDir } from "fs-extra";
import ora from "ora";
import * as rimraf from "rimraf";
import { dir, dirSync } from "tmp-promise";
import { appNameQuery } from "./appNameQuery.js";
import { checkRequirements } from "./checkRequirements.js";
import { tauriCreate } from "./tauri/create.js";
import { fetchWebManifest } from "./fetchWebManifest.js";
import { pwaUrlQuery } from "./pwaUrlQuery.js";
import { tauriBuild } from "./tauri/build.js";
import { updateTauriConf } from "./tauri/config/index.js";

const spinner = ora("Loading @mrtnvh/pwa-to-tauri").start();

// Action: npx @mrtnvh/pwa-to-tauri

// Check if Rust and Cargo are installed
spinner.text = "Checking requirements...";
await checkRequirements();
spinner.stop();

// Question: What is the URL of your PWA? (https://example.com)
const { pwaUrl }: { pwaUrl: string } = await pwaUrlQuery();

// Action: Fetch web app manifest
spinner.start();
spinner.text = "Fetching web app manifest...";
const manifest = await fetchWebManifest(pwaUrl);
spinner.stop();

// Question: What is the name of your PWA? (Example) Auto-filled
const { appName }: { appName: string } = await appNameQuery({ manifestAppName: manifest.name || "" });

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
  pwaUrl,
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
await rimraf(tempDirPath);

spinner.succeed(`Done! ${appName} is now available in ${appDir}`);
