import getConfig from './lib/config.js';
import { runAnalyzer } from './lib/analyzer.js';
import chalk from "chalk";

export const run = async () => {
    const { extensions, globalIgnorePatterns } = await getConfig();

    Object.entries(extensions).forEach(([extension, extConfig]) => {
        if(!extension) {
            console.log(
                    chalk.yellow(
                            'Please provide at least one extension config'
                    )
            );

            process.exit(0);
        }

        runAnalyzer(extension, extConfig, globalIgnorePatterns);
    });
};
