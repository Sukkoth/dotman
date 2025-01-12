import { getToken } from "../../services/authService.js";
import { toast } from "../consoleDisplay.js";
import axios from "axios";

export async function getProjects() {
    try {
        const token = await getToken();
        toast({ message: '\nFetching projects...' });
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

export async function linkProject() {
    try {
        const token = await getToken();
        toast({ message: 'Linking project...' });
        const response = await axios.post('http://localhost:3300/api/projects', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.id;
    } catch (error) {
        if (error?.code === 'ECONNREFUSED') {
            throw new Error('Could not connect to the server');
        }
        throw new Error(error.message || 'Failed to fetch projects');
    }
}