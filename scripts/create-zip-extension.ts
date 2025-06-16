import { execSync } from 'node:child_process';
import { getDistManifestDir } from '../src/utils/extension-targets';

const PROD_ZIP_FILE_NAME = 'extension';

(function main() {
    console.log('Creating production extension zip...');
    execSync(`(cd ${getDistManifestDir()} && zip -r ${PROD_ZIP_FILE_NAME} .)`);
    console.log(
        `✅ Created ${getDistManifestDir()}/${PROD_ZIP_FILE_NAME}.zip for production.`
    );
})();
