module.exports = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  endOfLine: "lf",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "^@customTypes/(.*)$",
    "^[.]",
    "",
    "^(?!.*[.]scss$)[./].*$",
    ".scss$",
  ],
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
};
