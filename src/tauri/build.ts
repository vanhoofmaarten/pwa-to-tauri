import { execaCommand } from "execa";

export async function tauriBuild(options: { workDirPath: string }) {
  await execaCommand("npx -y @tauri-apps/cli build", {
    cwd: options.workDirPath,
  });
}
