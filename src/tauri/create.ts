import { execaCommand } from "execa";
import { ensureDir } from "fs-extra/esm";

export async function tauriCreate(dirPath: string) {
  await execaCommand(`npx -y @tauri-apps/cli init --force --ci -d ${dirPath}`);
  await ensureDir(`${dirPath}/dist`);
}
