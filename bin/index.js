#!/usr/bin/env node
import { Command } from 'commander';
import displayVariables from "./utils/displayVariables.js";
import { loginCommand } from "./utils/loginCommand.js";
import readVariables from "./utils/readVariables.js";

const program = new Command();

program
    .name('dotman')
    .description('Manage your .env variables efficiently')
    .version('1.0.0');

// Push command
program
    .command('push')
    .description('Push the local .env file to the cloud')
    .option('--override', 'Overwrite existing variables')
    .option('--dry-run', 'Preview changes without applying')
    .action((options) => {
        console.log('Executing push with options:', options);
    });

// Sync command
program
    .command('sync')
    .description('Sync the local .env file with the cloud')
    .option('--resolve <strategy>', 'Resolve conflicts (local/cloud)')
    .option('--backup', 'Create a backup of the local .env file before syncing')
    .action((options) => {
        console.log('Executing sync with options:', options);
    });

// Revert command
program
    .command('revert')
    .description('Replace the local .env file with the cloud version')
    .option('--backup', 'Create a backup of the current file')
    .action((options) => {
        console.log('Executing revert with options:', options);
    });

// List command
program
    .command('list')
    .description('List all environment variables in the project')
    .action(() => {
        const envVars = readVariables();
        displayVariables(envVars);
    });

// Get command
program
    .command('get <key>')
    .description('Get the value of a specific environment variable')
    .action((key) => {
        console.log(`Getting the value for key: ${key}`);
        const envVars = readVariables();
        displayVariables(envVars, key);
    });

// Set command
program
    .command('set <key> <value>')
    .description('Set a new value for an environment variable')
    .action((key, value) => {
        console.log(`Setting ${key} to ${value}`);
    });

// Remove command
program
    .command('remove <key>')
    .description('Remove a specific environment variable')
    .action((key) => {
        console.log(`Removing the variable: ${key}`);
    });

// Projects command
program
    .command('projects')
    .description('List all linked projects')
    .action(() => {
        console.log('Listing all linked projects...');
    });

// Backup command
program
    .command('backup')
    .description('Create a backup of the current .env file')
    .action(() => {
        console.log('Creating a backup of the current .env file...');
    });


    program
    .command('login')
    .requiredOption('--email <email>', 'Email address')
    .description('Login to your account to use sync and push commands')
    .action(async (options) => {
      await loginCommand(options.email);
    });


program.parse(process.argv);
