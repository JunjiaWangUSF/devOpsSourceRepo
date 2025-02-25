export default {
  testEnvironment: "node",
  transform: {},
  testMatch: [
    "**/test/**/*.test.js", // This line directs Jest to look in the 'test' directory for any files ending with '.test.js'
    "**/?(*.)+(spec|test).[tj]s?(x)", // Keeps the default settings as well
  ],
};
