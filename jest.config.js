// module.exports = {
//   testEnvironment: "jsdom",
//   setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
//   testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
//   moduleFileExtensions: ["js", "jsx", "json", "node"],
//   transform: {
//     "^.+\\.[jt]sx?$": "babel-jest",
//   },
// };
export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
};
