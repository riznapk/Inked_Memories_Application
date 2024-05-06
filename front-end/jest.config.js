module.exports = {
  jest: {
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    transformIgnorePatterns: ["/node_modules/", "\\.css$"],
  },
};
