import { getPropjects } from "../services/projectsService.js";
import { displayProjects } from "../utils/consoleDisplay.js";
import { toast } from "../utils/consoleDisplay.js";
import { linkProject } from "../utils/projects/projectUtils.js";

export default async function projectsCommand() {
    try {
        const projects = await getPropjects();
        displayProjects(projects);
    } catch (error) {
        toast({ message: error?.message || 'Failed to fetch projects', type: 'error' });
    }
}

export async function linkProjectCommand() {
    try {
        const projectId = await linkProject();
        toast({ message: `Project linked successfully! Project ID: ${projectId}`, type: 'success' });
    } catch (error) {
        toast({ message: error?.message || 'Failed to link project', type: 'error' });
    }
}