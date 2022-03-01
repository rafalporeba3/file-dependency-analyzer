import path from 'path';
import { readFile } from './files.js';

export const getCWD = () => {
    return path.resolve(process.cwd());
};

export const mapToReadableFiles = async sourceFilePaths => {
    try {
        const promises = sourceFilePaths.map(filePath => {
            return readFile(filePath);
        });

        return Promise.all(promises);
    } catch (err) {
        console.log(err);
    }
};
