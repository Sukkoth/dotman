import chalk from 'chalk';

function promptPassword() {
    return new Promise((resolve) => {
        let password = '';
        process.stdout.write('Password: ');
        
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding('utf-8');
        
        process.stdin.on('data', (char) => {
            const input = char.toString();
            
            // Handle Ctrl+C
            if (input === '\u0003') {
                process.stdout.write('\n');
                process.exit();
            }
            
            // Handle Enter
            if (input === '\r' || input === '\n') {
                process.stdout.write('\n');
                process.stdin.setRawMode(false);
                process.stdin.pause();
                resolve(password);
                return;
            }
            
            // Handle backspace
            if (input === '\u0008' || input === '\u007f') {
                if (password.length > 0) {
                    password = password.slice(0, -1);
                    process.stdout.write('\b \b');
                }
                return;
            }
            
            // Add character to password
            password += input;
            for (let i = 0; i < input.length; i++) {
                process.stdout.write('*')
            }
        });
    });
}

export async function loginCommand(email) {
    console.log(chalk.cyan('\nLogging in...'));
    console.log(chalk.dim(`Email: ${email}`));
    
    try {
        const password = await promptPassword();
        
        // Here you would typically make an API call to authenticate
        // For now, we'll just simulate a successful login
        console.log(chalk.green('\nLogin successful!'), {email,password});
        
        // Store the credentials securely (implement this based on your needs)
        // For example, you might want to store a token in a config file
        
    } catch (error) {
        console.error(chalk.red('\nLogin failed:', error.message));
        process.exit(1);
    }
}
