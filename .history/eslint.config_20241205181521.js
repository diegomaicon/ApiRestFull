import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
    },
  },
  {
      files: ["**/*.ts", "**/*.tsx"]
  },
  {
    ignores: [".config/*","node_modules" ,"dist","build","/*.js"]
  },
  pluginJs.configs.recommended,
];
