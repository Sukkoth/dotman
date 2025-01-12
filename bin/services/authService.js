import fs from 'fs';
import { configPath } from '../../constants.js';
import { toast } from '../utils/consoleDisplay.js';
import axios from 'axios';

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

export async function requestAuthToken(credentials) {
    // Here you would typically make an API call to authenticate
    // For now, we'll just simulate a successful login
    toast({ message: 'Requesting auth ...', type: 'info' });
    const res = await axios.post('http://localhost:3300/api/auth', credentials);
    return res.data;
}