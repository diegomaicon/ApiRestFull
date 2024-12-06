import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
      files: ["**/*.ts", "**/*.tsx"]
  },
  {
    ignores: [".config/*","node_modules"
,"dist
build
/*.js]
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];

