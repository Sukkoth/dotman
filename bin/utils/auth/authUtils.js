export function promptPassword() {
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