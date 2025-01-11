import chalk from "chalk";

export function displayProjects(projects) {
    if(projects) {
        console.log('\n' + chalk.bold.green('📋 LINKED PROJECTS') + '\n');
        
        if (projects.length === 0) {
            console.log(chalk.yellow('No projects found.'));
            return;
        }

        // Get all unique keys from all projects
        const allKeys = [...new Set(projects.flatMap(project => Object.keys(project)))];
        
        // Calculate maximum lengths for each field
        const maxKeyLength = Math.max(...allKeys.map(key => key.length));
        const maxValueLength = Math.max(
            ...projects.flatMap(project => 
                allKeys.map(key => String(project[key] || '').length)
            )
        );

        // Calculate total width for the box
        const totalWidth = maxKeyLength + maxValueLength + 8; // padding and separators

        projects.forEach((project, index) => {
            // Top border
            console.log(chalk.gray('╭' + '─'.repeat(totalWidth) + '╮'));
            
            // Fields
            allKeys.forEach((key, keyIndex) => {
                const value = String(project[key] || '');
                console.log(
                    chalk.gray('│ ') +
                    chalk.green.bold(`${key.padEnd(maxKeyLength)}: `) +
                    chalk.yellow(value.padEnd(maxValueLength)) 
                );
                
                // Add separator line if not the last field
                if (keyIndex < allKeys.length - 1) {
                    console.log(chalk.gray('├' + '─'.repeat(totalWidth) + '┤'));
                }
            });

            // Bottom border with spacing between projects
            if (index < projects.length - 1) {
                console.log(chalk.gray('╰' + '─'.repeat(totalWidth) + '╯\n'));
            } else {
                console.log(chalk.gray('╰' + '─'.repeat(totalWidth) + '╯'));
            }
        });
        console.log('\n')
    }
}

export function toast(args) {
    const {message, type, hideAlertType = false} = args;
    const types = {
        'warn': {background: chalk.bgYellowBright, foreground: chalk.yellowBright, alertText: ' WARN: '},
        'error': {background: chalk.bgRedBright, foreground: chalk.redBright, alertText: ' ERROR: '},
        'success': {background: chalk.bgGreen, foreground: chalk.green, alertText: ' SUCCESS: '},
        'info': {background: chalk.bgBlueBright, foreground: chalk.blueBright, alertText: ' INFO: '}
    }

  const {background, foreground, alertText} = types[type || 'info'];
    if(!hideAlertType) console.log(background(alertText), foreground(message));
    else console.log(foreground(message));
}