const { resolve } = require("node:path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");
const { generateApiForTest } = require("../../helpers/generateApiForTest");
const assertGeneratedModule = require("../../helpers/assertGeneratedModule");

const schemas = createSchemaInfos({
  absolutePathToSchemas: resolve(__dirname, "./"),
});

schemas.forEach(({ absolutePath, apiFileName }) => {
  generateApiForTest({
    testName: "--axios option test",
    silent: true,
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    generateClient: true,
    httpClientType: "axios",
  }).then(() => {
    validateGeneratedModule(resolve(__dirname, `./${apiFileName}`));
    assertGeneratedModule(
      resolve(__dirname, `./${apiFileName}`),
      resolve(__dirname, "./expected.ts"),
    );
  });
});
