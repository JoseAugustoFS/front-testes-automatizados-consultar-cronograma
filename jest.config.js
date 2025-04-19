module.exports = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.test.json" }]
    },
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1"
    },
    transformIgnorePatterns: [
      "/node_modules/(?!YOUR_ESM_PACKAGE_HERE).+\\.js$"
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
  };
  