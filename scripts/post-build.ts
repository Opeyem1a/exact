import fs from 'fs';
import { jsonParse } from '../src/utils/json';
import { getDistManifestPath } from '../src/utils/extension-targets';

function removeMockGeckoId() {
    const rawManifest = fs.readFileSync(getDistManifestPath(), 'utf-8');
    const manifestJson = jsonParse(rawManifest);

    const browserSpecificSettings = manifestJson['browser_specific_settings'];
    if (
        typeof browserSpecificSettings !== 'object' ||
        browserSpecificSettings === null ||
        Array.isArray(browserSpecificSettings)
    )
        return;

    delete browserSpecificSettings['gecko'];
    fs.writeFileSync(getDistManifestPath(), JSON.stringify(manifestJson), {
        encoding: 'utf8',
    });
    console.log(`Removed dev-only mock gecko id from ${getDistManifestPath()}`);
}

(function main() {
    console.log(`Preparing ${getDistManifestPath()} for production...`);
    if (process.env.BROWSER === 'firefox') {
        removeMockGeckoId();
    }
    console.log(`✅ Prepared ${getDistManifestPath()} for production.`);
})();
