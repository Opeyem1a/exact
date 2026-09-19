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
        <div className="w-60 p-4 flex flex-col gap-3">
            <h1 className="font-semibold">Exact</h1>
            <p className="text-xs text-gray-500">
                Images and videos on Instagram, LinkedIn, X and YouTube stay
                grey until you rest your cursor on them. Videos stay in colour
                while they play.
            </p>
            {page === 'unsupported' && (
                <p className="text-xs text-gray-500">
                    Exact isn&rsquo;t running on this page.
                </p>
            )}
            {(page === 'enabled' || page === 'disabled') && (
                <div className="flex flex-col gap-1.5">
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
                    <p className="text-xs text-gray-500">
                        {page === 'disabled'
                            ? 'Exact is off in this tab until you enable it or reload the page.'
                            : 'Turns Exact off in this tab until you reload.'}
                    </p>
                </div>
            )}
        </div>
    );
};

export { Popup };
