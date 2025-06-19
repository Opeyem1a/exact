import browser from 'webextension-polyfill';

interface UpdateConfigPayload {
    enabled: true;
}

browser.runtime.onMessage.addListener(async function updateConfigListener(
    message: unknown
) {
    try {
        const tabs = await browser.tabs.query({
            currentWindow: true,
            active: true,
        });

        if (!tabs.length) {
            throw new Error('There should be at least 1 active tab');
        }
        if (tabs.length > 1) {
            throw new Error('There should not be more than 1 active tab');
        }

        const activeTab = tabs[0];

        if (!activeTab.id) {
            throw new Error('There should be an active tab id');
        }

        if (!(typeof message === 'object' && message && 'enabled' in message)) {
            throw new Error('Misconfigured message');
        }

        const shouldEnable = (message as UpdateConfigPayload).enabled;

        await browser.scripting.executeScript({
            target: {
                tabId: activeTab.id,
            },
            func: shouldEnable ? executeScriptEnable : executeScriptDisable,
        });
    } catch (err) {
        console.error(`(background:updateConfigListener): ${err}`);
    }
});

function executeScriptEnable() {
    const html = document.querySelector('html');
    if (!html) return;
    html.removeAttribute(
        /**
         * @see {EXACT_EXTENSION_STATUS_ATTR_NAME}
         */
        'data-exact-extension-status'
    );
}

function executeScriptDisable() {
    const html = document.querySelector('html');
    if (!html) return;
    html.setAttribute(
        /**
         * @see {EXACT_EXTENSION_STATUS_ATTR_NAME}
         */
        'data-exact-extension-status',
        /**
         * @see {EXACT_EXTENSION_STATUS_ATTR_VALUE__DISABLED}
         */
        'disabled'
    );
}
