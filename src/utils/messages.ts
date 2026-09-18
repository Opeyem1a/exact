/**
 * Messages the popup sends to the content script in the active tab. Both
 * reply with the page's current {@link ExactStatus}.
 */
type ExactMessage =
    | { type: 'exact:get-status' }
    | { type: 'exact:set-disabled'; disabled: boolean };

interface ExactStatus {
    disabled: boolean;
}

/**
 * Firefox's promise-based `browser`, or Chrome's `chrome`, which returns
 * promises under Manifest V3.
 */
const extension: typeof chrome =
    (globalThis as { browser?: typeof chrome }).browser ?? chrome;

export type { ExactMessage, ExactStatus };
export { extension };
