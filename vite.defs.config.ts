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
    'linkedin-exceptions': {
        target: 'src/content/main/linkedin-exceptions.css',
        outDir: `${getDistManifestDir()}/content`,
        assetFileNames: 'linkedin-exceptions.css',
    },
    'instagram-exceptions': {
        target: 'src/content/main/instagram-exceptions.css',
        outDir: `${getDistManifestDir()}/content`,
        assetFileNames: 'instagram-exceptions.css',
    },
    'twitter-exceptions': {
        target: 'src/content/main/twitter-exceptions.css',
        outDir: `${getDistManifestDir()}/content`,
        assetFileNames: 'twitter-exceptions.css',
    },
    'youtube-exceptions': {
        target: 'src/content/main/youtube-exceptions.css',
        outDir: `${getDistManifestDir()}/content`,
        assetFileNames: 'youtube-exceptions.css',
    },
};

export type { StandaloneIIFEScriptConfig, StandaloneCssConfig };
export {
    STANDALONE_SCRIPT_CONFIG_DEFS,
    STANDALONE_CSS_CONFIG_DEFS,
};
