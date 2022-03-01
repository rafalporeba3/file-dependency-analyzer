import path from 'path';
import { readFile } from './files.js';

export const getCWD = () => {
    return path.resolve(process.cwd());
};

const isComment = line => {
    return new RegExp('//.*').test(line);
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

export const getFilteredFiles = (files, dataStreams) => {
    return files.filter(file => {
        const included = [];

        dataStreams.forEach(stream => {
            if (stream && stream.length) {
                for (let line = 0; line < stream.length; line++) {
                    if (
                            isComment(stream[line]) &&
                            stream[line].includes(file)
                    ) {
                        included.push(true);
                    }
                }
            }
        });

        return included.some(f => f);
    });
};
