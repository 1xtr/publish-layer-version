const { getInput, info: logInfo, setFailed } = require("@actions/core");
const { LambdaClient, PublishLayerVersionCommand } = require("@aws-sdk/client-lambda");
const { readFileSync } = require("fs");

/**
 * @typedef {import("@aws-sdk/client-lambda").LambdaClient} LambdaClient
 * @typedef {import("@aws-sdk/client-lambda").LambdaClientConfig} LambdaClientConfig
 * @typedef {import("@aws-sdk/client-lambda").PublishLayerVersionCommand} PublishLayerVersionCommand
 * @typedef {import("@aws-sdk/client-lambda").PublishLayerVersionCommandInput} PublishLayerVersionCommandInput
 * @typedef {import("@aws-sdk/client-lambda").PublishLayerVersionCommandOutput} PublishLayerVersionCommandOutput
 */

/**
 * @type {LambdaClient}
 */
let client;
try {
  /**
   * @type {LambdaClientConfig}
   */
  const clientConfig = {
    region: process.env.AWS_REGION,
    maxAttempts: 2,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  };

  client = new LambdaClient(clientConfig);

  logInfo("LambdaClient created successfully...");
} catch (e) {
  setFailed(e);
}

/**
 * @type {PublishLayerVersionCommand}
 */
let command;
try {
  const LayerName = getInput("layer_name", { required: true });
  const layerFile = getInput("zip_file", { required: true });
  const Description = getInput("layer_desc", { required: false });
  const archStr = getInput("arch", { required: false });
  const runtimeStr = getInput("runtime", { required: false });

  const commandOptions = {
    LayerName,
    Content: {
      ZipFile: readFileSync(layerFile),
    },
  };
  if (Description) {
    commandOptions.Description = Description;
  }
  if (archStr) {
    const arch = archStr.replaceAll(/\s/g, "");
    commandOptions.CompatibleArchitectures = arch.split(",");
  }
  if (runtimeStr) {
    const runtime = runtimeStr.replaceAll(/\s/g, "");
    commandOptions.CompatibleRuntimes = runtime.split(",");
  }
  command = new PublishLayerVersionCommand(commandOptions);
  console.log({ command });
  logInfo("LambdaClient Command created successfully...");
} catch (e) {
  setFailed(e);
}

async function publish() {
  try {
    /**
     * @type {PublishLayerVersionCommandOutput}
     */
    const response = await client.send(command);

    if (response && response.$metadata.httpStatusCode === 200) {
      logInfo("New layer version published successfully");
      logInfo(`Layer version ARN: ${response.LayerVersionArn}, Version: ${response.Version}`);
    }
  } catch (e) {
    setFailed(e);
  }
}

publish();
