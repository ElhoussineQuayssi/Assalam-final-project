// eslint.config.cjs
const js = require("@eslint/js");
const prettier = require("eslint-config-prettier");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    ignores: ["node_modules/**", "dist/**" , ".next/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
        // Next.js specific globals
        React: "readonly",
        JSX: "readonly",
        // API Routes globals
        Response: "readonly",
        Request: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "no-undef": "off", // Disable no-undef since we're providing globals
      "no-console": "off",
    },
  },
  prettier,
];
