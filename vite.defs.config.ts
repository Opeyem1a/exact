import { getDistManifestDir } from './src/utils/extension-targets';

interface StandaloneIIFEScriptConfig {
    target: string;
    outDir: string;
    entryFileNames: string;
}

interface StandaloneCssConfig {
    target: string;
    outDir: string;
    assetFileNames: string;
}

const STANDALONE_SCRIPT_CONFIG_DEFS: Record<
    string,
    StandaloneIIFEScriptConfig
> = {
    ui: {
        target: 'src/content/main/main.ts',
        outDir: `${getDistManifestDir()}/content`,
        entryFileNames: 'main.js',
    },
};

const STANDALONE_CSS_CONFIG_DEFS: Record<string, StandaloneCssConfig> = {
    main: {
        target: 'src/content/main/main.css',
        outDir: `${getDistManifestDir()}/content`,
        assetFileNames: 'main.css',
    },
};

export type { StandaloneIIFEScriptConfig, StandaloneCssConfig };
export { STANDALONE_SCRIPT_CONFIG_DEFS, STANDALONE_CSS_CONFIG_DEFS };
