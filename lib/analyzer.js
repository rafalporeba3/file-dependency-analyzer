import chalk from 'chalk';

import {
    getAllFilesForExtension,
    getAllProjectFiles,
    getUnusedFiles,
    removeFiles,
} from './files.js';
import { getCWD, getFilteredFiles, mapToReadableFiles } from './utils.js';

const log = console.log;

const defaultIgnorePatterns = [
    'node_modules',
    'git',
    'vscode',
    'idea',
    'package.json',
    'package-lock.json',
    'README.md',
    'dist',
];

export const runAnalyzer = async (extension, config, globalIgnorePatterns) => {
    const {
        mode = 'analyze',
        analyzeComments = true,
        ignorePatterns = [],
        analyzeFrom = [],
        analyzeIn = [],
    } = config;

    const ignoredFilePatterns = [
        ...new Set([
            ...defaultIgnorePatterns,
            ...ignorePatterns,
            ...globalIgnorePatterns,
        ]),
    ];

    const filesWithProvidedExtension = getAllFilesForExtension(
            getCWD(),
            getCWD(),
            ignoredFilePatterns,
            extension,
            analyzeFrom
    );

    const allProjectFiles = getAllProjectFiles(
            getCWD(),
            ignoredFilePatterns,
            analyzeIn
    );
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
    console.log(
            chalk.magenta('The following files have been removed:'),
            notUsedFiles
    );
};
