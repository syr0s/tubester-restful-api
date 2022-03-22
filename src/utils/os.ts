import fs from 'fs';
import logger from '../config/logger';
import { rootDir } from '../server';
import FatalError from './error_handler';

export class OS {
    /** The root directory of the project */
    protected rootDir: string = rootDir;

    public creteDir(path: string): void {
        if (!this.fileExists(path)) {
            fs.mkdirSync(path);
            logger.info(`Created directory: ${path}`);
        } 
    }

    /**
     * Reads a file into buffer.
     * @param path the path to the file to read as `stirng`
     * @returns
     */
    protected readFile(path: string): Buffer {
        if (this.fileExists(path)) {
            const result = fs.readFileSync(path);
            return result;
        }
        throw new FatalError(`${path} did not exists`);
    }

    /**
     * Write a given string to a file.
     * @param path 
     * @param data 
     */
    protected writeFile(path: string, data: string): void {
        fs.writeFileSync(path, data);
    }

    /**
     * Check if a certain file exists.
     * @param path 
     * @returns 
     */
    protected fileExists(path: string): boolean {
        if (fs.existsSync(path)) {
            return true
        }
        return false
    }
}