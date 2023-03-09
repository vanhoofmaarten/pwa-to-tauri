import inquirer from "inquirer";
import { z } from "zod";

const $manifestUrl = z.string();

export const manifestUrlQuery = ({ manifestUrl }: { manifestUrl?: string }): Promise<{ manifestUrl: string }> =>
  inquirer.prompt(
    [
      {
        name: "manifestUrl",
        message: "Not able to retrieve manifestURL, please enter it manually",
        validate: (input) => {
          $manifestUrl.parse(input);
          return true;
        },
      },
    ],
    { manifestUrl: manifestUrl }
  );
