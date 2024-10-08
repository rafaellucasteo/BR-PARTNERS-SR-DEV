export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@schemas/(.*)$": "<rootDir>/src/schemas/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
  },
};
