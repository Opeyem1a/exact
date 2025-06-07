import { build } from 'vite';
import {
    webextConfig,
    STANDALONE_SCRIPT_CONFIGS,
    STANDALONE_CSS_CONFIGS,
} from '../vite.build.config';

(async function main() {
    // It's important that this runs first, since it's the only build config that deletes /dist before running
    await build(webextConfig);
    for (const scriptConfig of STANDALONE_SCRIPT_CONFIGS) {
        await build(scriptConfig);
    }
    for (const cssConfig of STANDALONE_CSS_CONFIGS) {
        await build(cssConfig);
    }
})();
