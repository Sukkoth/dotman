#!/usr/bin/env node
import { Command, Option } from 'commander';
import { getPropjects } from './services/projectsService.js';
import { toast, displayProjects } from './utils/consoleDisplay.js';
import { loginCommand, logoutCommand } from './commands/authCommands.js';
import { generateExampleEnvFileCommand, listVariablesCommand } from './commands/variableCommands.js';
import { linkProjectCommand } from './commands/projectCommands.js';

const program = new Command();

program
    .name('dotman')
    .description('Manage your .env variables efficiently')
    .version('1.0.0');

program.command('login')
    .description('Login to your account')
    .requiredOption('--email <email>', 'Your email address')
    .action(({ email }) => {
        loginCommand(email);
    });

program.command('logout')
    .description('Logout of your account')
    .action(() => {
        logoutCommand();
    });

program.command('link')
    .description('Link a project to sync variables')
    .action(() => {
        linkProjectCommand();
    });
// List command
program
    .command('list')
    .description('List all environment variables in the project')
    .option('--local', 'List local variables, this is default')
    .option('--cloud', 'List variables from the cloud')
    .action((option) => {
        listVariablesCommand(option);
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

// Projects command
program
    .command('projects')
    .description('List all linked projects')
    .action(async () => {
        try {
            const projects = await getPropjects();
            if (!projects || projects.length === 0) {
                toast({ message: 'No projects found, try linking a project first', type: 'success' });
                return;
            }
            displayProjects(projects);
        } catch (error) {
            toast({ message: error.message, type: 'error' });
        }
    });

program
    .command('generate-example')
    .description('Generate an example .env.example file')
    .addOption(new Option('--use <type>', 'Which env file type to use')
        .choices(['dev', 'prod', 'staging'])
        .default('dev', 'Use .env.local as default to generate example'))
    .action((option) => {
        generateExampleEnvFileCommand(option);
    });


program.parse(process.argv);
