import fs from 'fs';
import { configPath } from '../../constants.js';

export async function getToken() {

    if (!fs.existsSync(configPath)) {
       throw new Error('No authentication found, please login first');
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (!config.email || !config.token) {
        throw new Error('No authentication found, please login first');
    }

    return config.token;
}