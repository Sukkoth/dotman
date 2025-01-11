import axios from 'axios';
import chalk from 'chalk';
import os from 'os';
import path from 'path';
import fs from 'fs';
import { toast } from './consoleDisplay.js';
import {configPath} from '../../constants.js'
import { getToken } from './auth.js';

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
  
    try {
        const token = await getToken().catch(() => {});
        if (token) {
         throw new Error('You are already logged in');
        }
     
        toast({message: 'Logging in ...\n', hideAlertType: true});
        toast({message: `Email: ${email}`, hideAlertType: true});

        const password = await promptPassword();

        // Here you would typically make an API call to authenticate
        // For now, we'll just simulate a successful login
        const auth = await handleAuth({ email, password })
        if (auth.status !== 'OK' || !auth.token) {
            throw new Error('Login failed');
        }


        const home = os.homedir();
        const config = {
            email: Buffer.from(email).toString('base64'),
            token: Buffer.from(auth.token).toString('base64')
        };

        if (!fs.existsSync(path.dirname(configPath))) {
            fs.mkdirSync(path.dirname(configPath), { recursive: true });
        }

        const configData = JSON.stringify(config, null, 2);
        fs.writeFileSync(configPath, configData);
        console.log('\n');
        toast({message: 'Login successful. You can now use dotman to manage your project env variables', type: 'success'});
        // Store the credentials securely (implement this based on your needs)
        // For example, you might want to store a token in a config file

    } catch (error) {
        toast({message: error.message || 'Login failed!', type: 'error'});
        process.exit(1);
    }
}


async function handleAuth(credentials) {
    // Here you would typically make an API call to authenticate
    // For now, we'll just simulate a successful login
    console.log(chalk.bgCyanBright('\Requesting auth ...'));
    const res = await axios.post('http://localhost:3300/api/auth', credentials);
    return res.data;
}