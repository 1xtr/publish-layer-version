module.exports = {
  "root": true,
  "env": {
    "node": true,
    "es2020": true,
  },
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "prettier",
  ],
  "plugins": [
    "prettier", "@typescript-eslint",
  ],
  "rules": {
    "no-console": "off",
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "lf",
      },
    ],
  },
};
