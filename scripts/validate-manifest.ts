import fs from 'fs';
import path from 'path';
import { JSONObject, jsonParse, JSONValue } from '../src/utils/json';

const EXPECTED_FILE_EXTENSIONS = [
    '.js',
    '.css',
    '.html',
    '.json',
    '.wasm',
    '.png',
];

function looksLikeFilePath(value: string): boolean {
    return (
        EXPECTED_FILE_EXTENSIONS.some((ext) => value.endsWith(ext)) &&
        !value.startsWith('http')
    );
}

function collectFilePaths(obj: JSONObject): string[] {
    const lookLikeFilePaths: string[] = [];

    function findFilePathsRecursive(value: JSONValue) {
        if (typeof value === 'string') {
            if (looksLikeFilePath(value)) {
                lookLikeFilePaths.push(value);
            }
        } else if (Array.isArray(value)) {
            value.forEach(findFilePathsRecursive);
        } else if (typeof value === 'object' && value !== null) {
            Object.values(value).forEach(findFilePathsRecursive);
        }
    }

    findFilePathsRecursive(obj);
    return lookLikeFilePaths;
}

function checkNamedFilesExist(manifestPath: string) {
    const manifestDir = path.dirname(manifestPath);
    const raw = fs.readFileSync(manifestPath, 'utf-8');
    const manifest = jsonParse(raw);

    const filePaths = collectFilePaths(manifest);
    const uniquePaths = Array.from(new Set(filePaths));

    let allExist = true;
    console.log(
        `\nVerifying ${uniquePaths.length} file(s) from ${manifestPath}\n`
    );

    for (const relPath of uniquePaths) {
        const fullPath = path.resolve(manifestDir, relPath);
        const exists = fs.existsSync(fullPath);

        if (exists) {
            console.log(`✅ ${relPath}`);
        } else {
            console.error(`❌ ${relPath} (NOT FOUND)`);
            allExist = allExist && false;
        }
    }

    if (allExist) {
        console.log('\n✅ All referenced files exist.\n');
    } else {
        console.error('\n❌ Some referenced files are missing.\n');
        process.exitCode = 1;
    }
}

const manifestPath =
    process.env.BROWSER === 'firefox'
        ? 'dist/firefox/manifest.json'
        : 'dist/chrome/manifest.json';
checkNamedFilesExist(manifestPath);
