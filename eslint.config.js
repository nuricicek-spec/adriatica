import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import typescript from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  // ── 1. Global ignores – build output, public assets, minified files ──────
  {
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/node_modules/**",
      "**/public/**",
      "**/*.min.js",
      "**/*.min.css",
      "**/pdf.worker.min.js",
      "**/vendor-*.js",
      "**/.vite-cache/**",      // <-- YENİ
      "**/client/.vite-cache/**", // <-- YENİ
      "**/deps/**",             // <-- YENİ
      "**/chunk-*.js"           // <-- YENİ
    ],
  },

  // ── 2. Temel JS önerileri ──────────────────────────────────────────────────
  js.configs.recommended,

  // ── 3. Kaynak dosyalar – sadece src/ altındaki TypeScript/React dosyaları ──
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": typescript,
    },
    settings: {
      react: { version: "detect", runtime: "automatic" },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-undef": "off", // TypeScript handles this
    },
  },

  // ── 4. Config dosyaları ve Node.js scriptleri (cjs/js/ts) ──────────────────
  {
    files: [
      "vite.config.ts",
      "tailwind.config.ts",
      "postcss.config.js",
      "eslint.config.js",
      "*.cjs",
      "*.js",
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: { ...globals.node },
    },
    plugins: { "@typescript-eslint": typescript },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },

  // ── 5. shadcn/ui bileşenleri – otomatik üretilmiş kod, kurallar gevşetildi ──
  {
    files: ["src/components/ui/**/*"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];