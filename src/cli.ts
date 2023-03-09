import pkg from "../package.json";
import { Command } from "commander";
const program = new Command();

export type CliArguments = { manifestUrl?: string; name?: string; startUrl?: string };

export function getCliArguments(): CliArguments {
  program
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version)
    .option("-m, --manifest <url>", "URL of the web app manifest")
    .option("-n, --name <string>", "Name of the to build application")
    .option("-s, --start-url <string>", "Start url of the to build application")
    .parse(process.argv);
  const options = program.opts();
  return {
    manifestUrl: options.manifest,
    name: options.name,
    startUrl: options.startUrl,
  };
}
