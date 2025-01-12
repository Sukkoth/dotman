import path from 'path';
import fs from 'fs';
import { getToken, requestAuthToken } from '../services/authService.js';
import { toast } from '../utils/consoleDisplay.js';
import { configPath } from '../../constants.js';
import { promptPassword } from '../utils/auth/authUtils.js';

export async function loginCommand(email) {
    try {
        const token = await getToken().catch(() => { });
        if (token) {
            throw new Error('You are already logged in');
        }

        toast({ message: 'Logging in ...\n', hideAlertType: true });
        toast({ message: `Email: ${email}`, hideAlertType: true });

        const password = await promptPassword();

        const auth = await requestAuthToken({ email, password })
        if (auth.status !== 'OK' || !auth.token) {
            throw new Error('Login failed');
        }

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
        toast({ message: 'Login successful. You can now use dotman to manage your project env variables', type: 'success' });
    } catch (error) {
        toast({ message: error.message || 'Login failed!', type: 'error' });
    }
}

export async function logoutCommand() {
    try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (!config.email || !config.token) {
            throw new Error('No authentication found, please login first');
        }
        fs.unlinkSync(configPath);
        toast({ message: 'Logout successful', type: 'success' });
    } catch (error) {
        toast({ message: error.message || 'Logout failed!', type: 'error' });
    }
}


