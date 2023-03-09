import https from "node:https";
import { createWriteStream } from "node:fs";

export function saveRemoteFile(options: { url: string; path: string }): Promise<void> {
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

export function getFileExtension(url: string) {
  return url.split(".").pop()?.split(/\#|\?/)[0];
}