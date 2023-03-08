import inquirer from "inquirer";
import { z } from "zod";

const $pwaUrl = z.string().url().startsWith("https://", { message: "Must provide secure URL" });

export const pwaUrlQuery = () => inquirer.prompt([
  {
    name: "pwaUrl",
    message: "What is the URL of your PWA?",
    validate: (input) => {
      $pwaUrl.parse(input);
      return true;
    },
  },
]);
