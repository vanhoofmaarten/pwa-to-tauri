import { execa } from "execa";

export const checkCargo = async () => {
  const { stdout } = await execa("cargo", ["--version"]);
  if (!stdout) throw new Error("Cargo is not installed");
  return true;
};

export const checkRust = async () => {
  const { stdout } = await execa("rustc", ["--version"]);
  if (!stdout) throw new Error("Rust is not installed");
  return true;
};

export const checkRequirements = async () => Promise.all([checkCargo(), checkRust()]);
