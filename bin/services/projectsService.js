import axios from "axios";
import { getToken } from "../utils/auth.js";
import chalk from "chalk";

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
        throw new Error(error.message || 'Failed to fetch projects');
    }
}