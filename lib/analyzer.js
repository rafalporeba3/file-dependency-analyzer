import chalk from 'chalk';

import {
    getAllFilesForExtension,
    getAllProjectFiles,
    getUnusedFiles,
    removeFiles,
} from './files.js';
import { getCWD, getFilteredFiles, mapToReadableFiles } from './utils.js';

const log = console.log;

const globalIgnoredPatterns = [
    'node_modules',
    'git',
    'vscode',
    'idea',
    'package.json',
    'package-lock.json',
    'README.md',
];

export const runAnalyzer = async (extension, config) => {
    const { mode, analyzeComments, ignorePatterns } = config;

    const ignoredFilePatterns = [...globalIgnoredPatterns, ...ignorePatterns];

    const filesWithProvidedExtension = getAllFilesForExtension(
            getCWD(),
            getCWD(),
            ignoredFilePatterns,
            extension
    );
    const allProjectFiles = getAllProjectFiles(getCWD(), ignoredFilePatterns);
    const dataStreams = await mapToReadableFiles(allProjectFiles);
    const mappedDataStreams = dataStreams.map(stream =>
            stream.toString().split(/(?:\r\n|\r|\n)/g)
    );

    const notUsedFiles = getUnusedFiles(
            filesWithProvidedExtension,
            mappedDataStreams,
            false
    );

    let commentedFiles = [];

    if (!notUsedFiles.length) {
        log(chalk.green(`No unused ${extension} files`));
    } else {
        log(chalk.yellow(`List of unused ${extension} files`), notUsedFiles);
    }

    if (analyzeComments) {
        commentedFiles = getFilteredFiles(
                filesWithProvidedExtension,
                mappedDataStreams,
                true
        );

        if (!commentedFiles.length && analyzeComments) {
            log(chalk.blue(`No commented ${extension} files`));
        } else if (analyzeComments) {
            log(
                    chalk.yellow(`List of commented ${extension} files`),
                    commentedFiles
            );
        }
    }

    if (mode !== 'cleanup') {
        return;
    }

    removeFiles(notUsedFiles);
};
