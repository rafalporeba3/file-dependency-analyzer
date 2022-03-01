import getConfig from './lib/config.js';
import { runAnalyzer } from './lib/analyzer.js';

export const run = async () => {
    const config = await getConfig();

    Object.entries(config).forEach(([extension, extConfig]) => {
        runAnalyzer(extension, extConfig);
    });
};
