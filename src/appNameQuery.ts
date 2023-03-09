import inquirer from "inquirer";
import { z } from "zod";

const $appName = z.string();

export const appNameQuery = ({ manifestAppName }: { manifestAppName?: string }): Promise<{ appName: string }> =>
  inquirer.prompt(
    [
      {
        name: "appName",
        message: "What is the name of your app?",
        validate: (input) => {
          $appName.parse(input);
          return true;
        },
      },
    ],
    { appName: manifestAppName }
  );
