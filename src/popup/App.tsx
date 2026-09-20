import { useEffect, useState } from 'react';
import { extension, ExactMessage, ExactStatus } from '../utils/messages';

/**
 * Sends a message to Exact's content script in the active tab. Rejects on
 * pages Exact doesn't run on, since there's no content script to answer.
 */
async function sendToActiveTab(message: ExactMessage): Promise<ExactStatus> {
    const [tab] = await extension.tabs.query({
        active: true,
        currentWindow: true,
    });
    if (tab?.id === undefined) throw new Error('No active tab');
    return extension.tabs.sendMessage(tab.id, message);
}

type PageState = 'loading' | 'unsupported' | ExactStatus;

const Popup = () => {
    const [page, setPage] = useState<PageState>('loading');

    useEffect(() => {
        sendToActiveTab({ type: 'exact:get-status' })
            .then(setPage)
            .catch(() => setPage('unsupported'));
    }, []);

    const setStatus = (status: ExactStatus) => {
        sendToActiveTab({ type: 'exact:set-status', status })
            .then(setPage)
            .catch(() => setPage('unsupported'));
    };

    return (
        <div className="w-56 p-4 flex flex-col gap-3">
            <h1 className="font-semibold">Exact</h1>
            {page === 'unsupported' && (
                <p className="text-xs text-gray-500">
                    Exact doesn&rsquo;t run on this page.
                </p>
            )}
            {(page === 'enabled' || page === 'disabled') && (
                <div className="flex flex-col gap-2">
                    {/*
                    A second way to hit the button, for anyone who reads the
                    preview as the thing to click. Keyboard users get the
                    button itself, so this stays out of the tab order
                     */}
                    <span
                        className="preview w-full cursor-pointer"
                        data-status={page}
                        aria-hidden
                        onClick={() =>
                            setStatus(
                                page === 'disabled' ? 'enabled' : 'disabled'
                            )
                        }
                    />
                    <p className="text-xs text-gray-500">
                        {page === 'enabled'
                            ? 'Browsing intentionally.'
                            : 'Paused for now.'}
                    </p>
                    <button
                        className={`
                            h-9 rounded-md px-3 text-sm transition-colors
                            ${
                                page === 'disabled'
                                    ? 'bg-gray-900 text-gray-50 hover:bg-gray-900/90'
                                    : 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50'
                            }
                        `}
                        onClick={() =>
                            setStatus(
                                page === 'disabled' ? 'enabled' : 'disabled'
                            )
                        }
                    >
                        {page === 'disabled' ? 'Enable' : 'Disable'}
                    </button>
                </div>
            )}
        </div>
    );
};

export { Popup };
