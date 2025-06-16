import path from 'path';

const DIST_MANIFEST_PATH =
    process.env.BROWSER === 'firefox'
        ? 'dist/firefox/manifest.json'
        : 'dist/chrome/manifest.json';

const DIST_MANIFEST_DIR = path.dirname(DIST_MANIFEST_PATH);

function getDistManifestPath() {
    return DIST_MANIFEST_PATH;
}

function getDistManifestDir() {
    return DIST_MANIFEST_DIR;
}

export {
    DIST_MANIFEST_DIR,
    DIST_MANIFEST_PATH,
    getDistManifestPath,
    getDistManifestDir,
};
