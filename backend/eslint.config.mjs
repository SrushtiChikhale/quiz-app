export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
      },
    },
  },
  {
    files: ["**/*.test.js", "test.js"],
    languageOptions: {
      globals: {
        test: "readonly",
        expect: "readonly",
      },
    },
  },
];