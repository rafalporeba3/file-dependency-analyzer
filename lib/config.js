import chalk from 'chalk';
import path from 'path';

import { readFile } from './files.js';

export default async function () {
    const [, , configPath] = process.argv;

    if (!configPath) {
        console.log(chalk.red('Please specify json configuration file'));
        process.exit(0);
    }

    const configCWDPath = path.resolve(process.cwd(), configPath);
    const config = await readFile(configCWDPath);

    if (!config) {
        console.log(
                chalk.yellow(
                        'Please provide correct config'
                )
        );

        process.exit(0);
    }

    return JSON.parse(config);
}
