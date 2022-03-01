import getConfig from './lib/config.js';
import { runAnalyzer } from './lib/analyzer.js';

export const run = async () => {
    const { extensions, globalIgnorePatterns } = await getConfig();

    Object.entries(extensions).forEach(([extension, extConfig]) => {
        runAnalyzer(extension, extConfig, globalIgnorePatterns);
    });
};
