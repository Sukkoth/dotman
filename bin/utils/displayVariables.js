import chalk from 'chalk';

export default function displayVariables(envVars, varName = null) {
    if (varName) {
        // Display specific variable
        if (envVars.hasOwnProperty(varName)) {
            console.log(`${chalk.green(varName)} => ${chalk.yellow(envVars[varName])}`);
        } else {
            console.error(chalk.red(`Error: Variable '${varName}' not found in .env file`));
            process.exit(1);
        }
    } else {
        // Display all variables
        console.log(chalk.cyan('Environment variables from .env file:'));
        Object.entries(envVars).forEach(([key, value]) => {
            console.log(`${chalk.green(key)} => ${chalk.yellow(value)}`);
        });
    }
}