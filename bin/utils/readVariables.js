import { config } from 'dotenv';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import chalk from 'chalk';

export default function readVariables() {
    const currentDir = process.cwd();
    const envPath = join(currentDir, '.env');

    if (!existsSync(envPath)) {
        console.error(chalk.red('Error: .env file not found in the current directory'));
        process.exit(1);
    }

    // Read the .env file content
    const envContent = readFileSync(envPath, 'utf8');
    const envVars = {};

    // Parse the .env file
    envContent.split('\n').forEach(line => {
        line = line.trim();
        if (line && !line.startsWith('#')) {
            const [key, ...values] = line.split('=');
            if (key) {
                envVars[key.trim()] = values.join('=').trim();
            }
        }
    });

    // Load into process.env
    config({ path: envPath });

    return envVars;
}