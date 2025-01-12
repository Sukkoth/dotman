import axios from "axios";
import chalk from "chalk";
import { getToken } from "./authService.js";

export async function getPropjects() {
    try {
        const token = await getToken();
        console.log(chalk.cyan('\nFetching projects...'));
        const response = await axios.get('http://localhost:3300/api/projects', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.projects;
    } catch (error) {
        if (error?.code === 'ECONNREFUSED') {
            throw new Error('Could not connect to the server');
        }
        throw new Error(error.message || 'Failed to fetch projects');
    }
}