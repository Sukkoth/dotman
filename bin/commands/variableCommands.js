import { displayVariables, generateExampleEnvFile, readVariables } from "../services/variablesService.js";

export async function listVariablesCommand(params) {
    const envVars = await readVariables({ cloud: !!params?.cloud });
    displayVariables(envVars);
}

export async function generateExampleEnvFileCommand(params) {
    await generateExampleEnvFile(params?.use);
}