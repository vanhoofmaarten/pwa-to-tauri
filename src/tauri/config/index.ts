import { rimraf } from "rimraf";
import https from "node:https";
import { createWriteStream } from "node:fs";
import { readJson, writeJson } from "fs-extra/esm";
import { defaultsDeep, snakeCase } from "lodash-es";
import { DeepPartial } from "utility-types";
import { WebManifest } from "../../fetchWebManifest.js";
import { Config } from "./schema.js";
import { execaCommand } from "execa";
import { ensureDir } from "fs-extra";
import { userAgent } from "../../userAgent.js";

async function getTauriConfig(configPath: string): Promise<Config> {
  return readJson(configPath);
}

async function writeTauriConfig(configPath: string, config: Config) {
  await writeJson(configPath, config);
}

function getIdentifierFromTitle(title: string) {
  const baseIdentifier = "com.mrtnvh.pwatotauri.";
  const identifier = snakeCase(title).replaceAll("_", "");
  return baseIdentifier + identifier;
}

function saveRemoteFile(options: { url: string; path: string }): Promise<void> {
  return new Promise((resolve, reject) => {
    const localFile = createWriteStream(options.path);
    https.get(options.url, (response) => {
      response.on("end", () => {
        resolve();
      });
      response.on("error", reject);
      response.pipe(localFile);
    });
  });
}

function getFileExtension(url: string) {
  return url.split(".").pop()?.split(/\#|\?/)[0];
}

async function getIconsFromManifest(options: { manifest: WebManifest; iconPath: string }) {
  // Get all icons from the web app manifest and save them to the temporary folder
  if (!options.manifest.icons) return [];
  const iconSources = options.manifest.icons.reduce((acc, icon) => {
    if (icon.src && icon.sizes) acc.push({ src: icon.src, sizes: icon.sizes });
    return acc;
  }, [] as { src: string; sizes: string }[]);

  const fileNames = await Promise.all(
    iconSources.map(async ({ src, sizes }) => {
      const newFilename = `${sizes}.${getFileExtension(src)}`;
      await saveRemoteFile({ url: src, path: `${options.iconPath}/${newFilename}` });
      return newFilename;
    })
  );
  return fileNames.map((fileName) => fileName);
}

async function getFavicon(options: { pwaUrl: string; iconPath: string }) {
  const fileName = "icon.ico";
  const faviconUrl = options.pwaUrl + "/favicon.ico";
  await saveRemoteFile({ url: faviconUrl, path: `${options.iconPath}/${fileName}` });
  return fileName;
}

async function createIconsFromLargestManifestIcon(manifestIcons: string[], iconPath: string) {
  if (manifestIcons.length === 0) return;
  const largestIcon = manifestIcons
    .map((icon) => {
      const [width] = icon.split("x");
      return { width: Number(width), height: Number(width) };
    })
    .reduce(
      (acc, icon) => {
        if (icon.width > acc.width) return icon;
        return acc;
      },
      { width: 0, height: 0 }
    );
  const largestIconFilename = `${largestIcon.width}x${largestIcon.height}.png`;
  await execaCommand(`npx -y @tauri-apps/cli icon ${iconPath}/${largestIconFilename}`, { cwd: iconPath });
}

// Action: Fetch icons from web app manifest.
// 1. Add icons to `src-tauri/icons`
// 1. Add icons to `src-tauri/tauri.conf.json`
// 1. Update tauri.conf.json
export async function updateTauriConf(options: {
  workDirPath: string;
  pwaUrl: string;
  title: string;
  manifest: WebManifest;
}) {
  await rimraf(`${options.workDirPath}/src-tauri/icons/*.*`);
  const tauriConfJsonPath = `${options.workDirPath}/src-tauri/tauri.conf.json`;
  const tauriConfig = await getTauriConfig(tauriConfJsonPath);
  const identifier = getIdentifierFromTitle(options.title);
  const iconPath = `${options.workDirPath}/src-tauri`;
  await ensureDir(iconPath);
  const manifestIcons = await getIconsFromManifest({ manifest: options.manifest, iconPath });
  await createIconsFromLargestManifestIcon(manifestIcons, iconPath);
  // const favicon = await getFavicon({ pwaUrl: options.pwaUrl, iconPath });
  // const icon = [/* ...manifestIcons, */ favicon].map((iconFilename) => `icons/${iconFilename}`);

  const newTauriConfig: DeepPartial<Config> = {
    build: {
      beforeBuildCommand: "",
      beforeDevCommand: "",
    },
    package: {
      productName: options.title,
      version: "0.0.0",
    },
    tauri: {
      bundle: {
        identifier,
        // icon,
      },
      windows: [
        {
          title: options.title,
          url: options.pwaUrl,
          maximized: true,
          resizable: true,
          titleBarStyle: "Transparent",
          userAgent,
        },
      ],
    },
  };
  await writeTauriConfig(tauriConfJsonPath, defaultsDeep(newTauriConfig, tauriConfig));
}
