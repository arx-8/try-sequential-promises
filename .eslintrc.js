module.exports = {
  env: {
    browser: true,
    es6: true,
    webextensions: true,
  },
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
    /** @see https://github.com/prettier/eslint-config-prettier#installation */
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest", "react"],
  rules: {
    complexity: ["error", 5],
    "import/no-default-export": "error",
    "import/prefer-default-export": "off",
    "no-console": "off",
    "prettier/prettier": [
      "error",
      {
        arrowParens: "always",
        semi: false,
        trailingComma: "all",
      },
    ],
    yoda: "off",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true },
    ],
    "@typescript-eslint/prefer-interface": "off",

    // ホイスティングの許可
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",

    // constructor のショートハンド（メンバーの省略記法）を使いたいため
    "@typescript-eslint/no-parameter-properties": "off",
    "no-useless-constructor": "off",
    "no-empty-function": "off",

    // しょうがない
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-explicit-any": "off",

    /**
     * ts と eslint の相性不良周りを解消するための設定
     */
    "import/no-unresolved": "off",
  },
}
