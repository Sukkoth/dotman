import readVariables from "./readVariables.js";
import {writeFileSync} from "fs";
import {join} from "path";
import {toast} from "./consoleDisplay.js";
import chalk from "chalk";

export function generateExampleEnvFile(option) {
    toast({message: `Generating example .env file from ${chalk.yellow.bold(option)} ...`, hideAlertType: true});
    const envVars = readVariables(option);
    const example = Object.entries(envVars).map(([key, value]) => `${key}=`).join('\n');
    writeToFile(example);
    toast({message: 'Example .env.example file generated successfully!', type: 'success'});
}

function writeToFile(content) {
    const currentDir = process.cwd();
    const envPath = join(currentDir, '.env.example');
    writeFileSync(envPath, content);
}

