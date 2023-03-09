// @ts-ignore
import { readJson, writeJson } from "fs-extra/esm";
import { deleteAsync } from "del";
import { defaultsDeep, snakeCase } from "lodash-es";
import { DeepPartial } from "utility-types";
import { WebManifest } from "../../fetchWebManifest.js";
import { Config } from "./schema.js";
import { execaCommand } from "execa";
import { ensureDir } from "fs-extra";
import { userAgent } from "../../userAgent.js";
import isRelativeUrl from "is-relative-url";
import { resolve } from "../../url.js";
import { getFileExtension, saveRemoteFile } from "../../file.js";

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

async function getFavicon(options: { baseUrl: string; iconPath: string }) {
  const fileName = "icon.ico";
  const faviconUrl = options.baseUrl + "/favicon.ico";
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

export function getWindowUrl(options: { baseUrl?: string; startUrl?: string; manifestUrl: string }) {
  if (!options.baseUrl && !options.startUrl && !options.manifestUrl) {
    throw new Error("No baseUrl, startUrl or manifestUrl defined");
  }

  // Use the origin of the manifestUrl as the base URL
  const manifestUrl = new URL(options.manifestUrl);
  let baseUrl = manifestUrl.origin;

  // If the baseUrl is defined, use it as the base URL
  if (options.baseUrl) baseUrl = options.baseUrl;

  // If the startUrl is not defined, return the baseUrl
  if (!options.startUrl) return baseUrl;

  if (baseUrl && isRelativeUrl(options.startUrl)) {
    // If the startUrl is relative, resolve it against the baseUrl
    return resolve(baseUrl, options.startUrl);
  }

  return options.startUrl;
}

// Action: Fetch icons from web app manifest.
// 1. Add icons to `src-tauri/icons`
// 1. Add icons to `src-tauri/tauri.conf.json`
// 1. Update tauri.conf.json
export async function updateTauriConf(options: {
  workDirPath: string;
  url: string;
  title: string;
  manifest: WebManifest;
}) {
  await deleteAsync(`${options.workDirPath}/src-tauri/icons/*.*`, { force: true });
  const tauriConfJsonPath = `${options.workDirPath}/src-tauri/tauri.conf.json`;
  const tauriConfig = await getTauriConfig(tauriConfJsonPath);
  const identifier = getIdentifierFromTitle(options.title);
  const iconPath = `${options.workDirPath}/src-tauri`;
  await ensureDir(iconPath);
  const manifestIcons = await getIconsFromManifest({ manifest: options.manifest, iconPath });
  await createIconsFromLargestManifestIcon(manifestIcons, iconPath);

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
      },
      windows: [
        {
          title: options.title,
          url: options.url,
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
