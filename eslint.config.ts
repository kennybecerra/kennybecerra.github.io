import jseslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config([
  {
    files: ["./src/**/*.{js,ts}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      // ...
    },
    extends: [
      jseslint.configs.recommended,
      tseslint.configs.recommended,
      prettierConfig,
    ],
  },
]);
