import { toast } from '../utils/consoleDisplay.js';
import { readCloudVariables, readLocalVariables } from '../utils/variables/readVariables.js';
import chalk from 'chalk';
import { writeFileSync } from "fs";
import { join } from "path";

export async function readVariables(options) {
    const readFromCloud = options?.cloud;
    toast({ message: `Reading ${readFromCloud ? 'cloud' : 'local'} variables ...\n`, hideAlertType: true });
    if (readFromCloud) {
        const variables = await readCloudVariables();
        return variables;
    }

    const variables = readLocalVariables();
    return variables;
}



export function displayVariables(envVars, varName = null) {
    if (varName) {
        // Display specific variable
        if (envVars.hasOwnProperty(varName)) {
            toast({ message: `${chalk.green(varName)} => ${chalk.yellow(envVars[varName])}`, hideAlertType: true });
        } else {
            toast({ message: `Error: Variable '${varName}' not found in .env file`, type: 'error' });
        }
    } else {
        if (!envVars || Object.keys(envVars).length === 0) {
            toast({ message: 'No variables found in .env file', type: 'info' });
            return;
        }
        // Display all variables
        Object.entries(envVars).forEach(([key, value]) => {
            toast({ message: `${chalk.green(key)} => ${chalk.yellow(value)}`, hideAlertType: true });
        });
    }
}


export async function generateExampleEnvFile(option) {
    toast({ message: `Generating example .env file from ${chalk.yellow.bold(option)} ...`, hideAlertType: true });
    const envVars = await readVariables(option);
    const example = Object.entries(envVars).map(([key, value]) => `${key}=`).join('\n');
    writeToFile(example);
    toast({ message: 'Example .env.example file generated successfully!', type: 'success' });
}

function writeToFile(content) {
    const currentDir = process.cwd();
    const envPath = join(currentDir, '.env.example');
    writeFileSync(envPath, content);
}

