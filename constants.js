import path from 'path';
import os from 'os';

const homeDirectory = os.homedir();
export const configPath = path.join(homeDirectory, '.config', 'dotman', '.config');



