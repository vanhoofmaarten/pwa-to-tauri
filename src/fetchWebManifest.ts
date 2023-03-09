import parser from "node-html-parser";
import { userAgent } from "./userAgent.js";

export interface WebManifestIcon {
  src?: string;
  sizes?: string;
  type?: string;
}

export interface WebManifest {
  name?: string;
  short_name?: string;
  start_url?: string;
  display?: string;
  description?: string;
  dir?: string;
  lang?: string;
  orientation?: string;
  scope?: string;
  theme_color?: string;
  icons?: WebManifestIcon[];
  [key: string]: any;
}

export const fetchPwaHomePageHtml = async (pwaUrl: string) => {
  const response = await fetch(pwaUrl, {
    headers: {
      "user-agent": userAgent,
    },
  });
  if (!response.ok) throw new Error(`Could not fetch ${pwaUrl}`);
  const html = await response.text();
  return html;
};

export const fetchWebManifestUrl = async (html: string) => {
  const linkElement = parser.parse(html).querySelector("link[rel=manifest]");
  if (!linkElement) throw new Error("No web app manifest link found");
  const manifestUrl = linkElement.getAttribute("href");
  if (!manifestUrl) throw new Error("No web app manifest url found");
  return manifestUrl;
};

export const fetchManifest = async (manifestUrl: string) => {
  const response = await fetch(manifestUrl, {
    headers: {
      "user-agent": userAgent,
    },
  });
  // throw new Error(JSON.stringify(response.ok, null, 2));
  if (!response.ok) throw new Error(`Could not fetch ${manifestUrl}`);
  const manifest: WebManifest = await response.json();
  return manifest;
};

export const fetchWebManifestFromPwaUrl = async (pwaUrl?: string) => {
  if (!pwaUrl) throw new Error("No PWA URL provided");
  const homePageHtml = await fetchPwaHomePageHtml(pwaUrl);
  const manifestUrl = await fetchWebManifestUrl(homePageHtml);
  const manifest = await fetchManifest(manifestUrl);
  return { manifest, manifestUrl };
};
