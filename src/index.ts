#!/usr/bin/env node

import { getCliArguments } from "./cli.js";
import { runTasks } from "./tasks.js";

const cliArguments = getCliArguments();
await runTasks(cliArguments);
