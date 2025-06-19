import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {
    STANDALONE_CSS_CONFIG_DEFS,
    STANDALONE_SCRIPT_CONFIG_DEFS,
    StandaloneCssConfig,
    StandaloneIIFEScriptConfig,
} from './vite.defs.config';
import { getDistManifestDir } from './src/utils/extension-targets';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir =
    process.env.BROWSER === 'firefox' ? 'public/firefox' : 'public/chrome';

const shared = {
    plugins: [react()],
};

function defineConfigContentScriptEntry(
    name: string,
    { target, outDir, entryFileNames }: StandaloneIIFEScriptConfig
): UserConfig {
    return defineConfig({
        ...shared,
        publicDir: false, // prevents Vite from copying /public
        build: {
            outDir,
            rollupOptions: {
                input: resolve(__dirname, target),
                output: {
                    format: 'iife',
                    // builds the IIFE with CSS-in-JS, no separate CSS file is created
                    entryFileNames: entryFileNames,
                },
            },
            emptyOutDir: false, // Don't delete previously built files
        },
    });
}

function defineConfigContentCssEntry(
    name: string,
    { target, outDir, assetFileNames }: StandaloneCssConfig
): UserConfig {
    return defineConfig({
        ...shared,
        publicDir: false, // prevents Vite from copying /public
        build: {
            outDir,
            rollupOptions: {
                input: resolve(__dirname, target),
                output: {
                    assetFileNames,
                },
            },
            emptyOutDir: false, // Don't delete previously built files
        },
    });
}

// Shared popup/options/background build
const webextConfig = defineConfig({
    ...shared,
    publicDir,
    build: {
        outDir: getDistManifestDir(),
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'src/popup/popup.html'),
            },
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
            },
        },
    },
});

const STANDALONE_SCRIPT_CONFIGS = Object.entries(
    STANDALONE_SCRIPT_CONFIG_DEFS
).map(([name, config]) => defineConfigContentScriptEntry(name, config));

const STANDALONE_CSS_CONFIGS = Object.entries(STANDALONE_CSS_CONFIG_DEFS).map(
    ([name, config]) => defineConfigContentCssEntry(name, config)
);

export { webextConfig, STANDALONE_SCRIPT_CONFIGS, STANDALONE_CSS_CONFIGS };
