import browser from 'webextension-polyfill';

function enable() {
    console.log('[exact] Enabling...');
    void browser.runtime.sendMessage({ enabled: true });
}

function disable() {
    console.log('[exact] Disabling...');
    void browser.runtime.sendMessage({ enabled: false });
}

function exact() {
    return {
        enable,
        disable,
    };
}

export { exact };
