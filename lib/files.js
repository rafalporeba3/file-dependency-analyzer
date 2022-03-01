import fs, { promises as fsPromises } from 'fs';
import path from 'path';
import chalk from 'chalk';

import { getCWD } from './utils.js';

export function getAllFilesForExtension(
        base,
        originalBase,
        ignoredPatters,
        extension,
        analyzeFrom,
        files,
        result
) {
    try {
        files = files || fs.readdirSync(base);
        result = result || [];

        files.forEach(function (file) {
            const newBase = path.join(base, file);
            const isIgnored = ignoredPatters.some(pattern =>
                    newBase.includes(pattern)
            );

            const isAnalyzedFromCorrectDir = analyzeFrom.some(
                    dir => newBase.includes(dir)
            );

            if (isIgnored || !isAnalyzedFromCorrectDir) {
                return;
            }

            if (fs.statSync(newBase).isDirectory()) {
                result = getAllFilesForExtension(
                        newBase,
                        originalBase,
                        ignoredPatters,
                        extension,
                        analyzeFrom,
                        fs.readdirSync(newBase),
                        result
                );
            } else {
                let newFile = newBase.replace(originalBase, '');
                const startsWithSlash = newFile.startsWith('/');

                if (startsWithSlash) {
                    newFile = newFile.substr(1);
                }

                if (
                        file.substr(-1 * (extension.length + 1)) ===
                        '.' + extension
                ) {
                    result.push(newFile);
                }
            }
        });

        return result;
    } catch (err) {
        console.log(err);
    }
}

export const getAllProjectFiles = (
        base,
        ignoredFilePatterns,
        analyzeIn,
        files,
        result
) => {
    try {
        files = files || fs.readdirSync(base);
        result = result || [];

        files.forEach(function (file) {
            const newBase = path.join(base, file);

            const isIgnored = ignoredFilePatterns.some(res =>
                    newBase.includes(res)
            );

            const isAnalyzedFromCorrectDir = analyzeIn.some(
                    dir => newBase.includes(dir)
            );

            if (isIgnored || !isAnalyzedFromCorrectDir) {
                return;
            }

            if (fs.statSync(newBase).isDirectory()) {
                result = getAllProjectFiles(
                        newBase,
                        ignoredFilePatterns,
                        analyzeIn,
                        fs.readdirSync(newBase),
                        result
                );
            } else {
                result.push(newBase);
            }
        });

        return result;
    } catch (err) {
        console.log(err);
    }
};

export const readFile = async filePath => {
    try {
        return await fsPromises.readFile(filePath, 'utf8');
    } catch (err) {
        console.log(chalk.red(`Cannot read file of path ${filePath}`));
    }
};

export const removeFiles = filePathsList => {
    try {
        filePathsList.forEach(filePath => {
            fs.unlinkSync(path.resolve(`${getCWD()}/${filePath}`));
        });
    } catch (err) {
        console.log(err);
    }
};

export const getUnusedFiles = (files, dataStreams) => {
    return files.filter(filePath => {
        const included = [];

        dataStreams.forEach(stream => {
            if (stream && stream.length) {
                for (let line = 0; line < stream.length; line++) {
                    if (stream[line].includes(filePath)) {
                        included.push(true);
                    }
                }
            }
        });

        return !included.length;
    });
};
