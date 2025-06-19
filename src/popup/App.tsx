import { exact } from '../core';

const Popup = () => {
    return (
        <div className="w-60 p-4 flex flex-col gap-3">
            <h1 className="font-semibold">Exact</h1>
            <p className="text-xs text-gray-500">
                This controls Exact's status on the current tab only.
            </p>
            <div className="flex gap-2">
                <button
                    className={`
                        h-9 rounded-md px-3 text-sm transition-colors disabled:pointer-events-none disabled:cursor-not-allowed 
                        bg-gray-900 text-gray-50 hover:bg-gray-900/90 disabled:bg-gray-900/50
                    `}
                    onClick={exact().enable}
                >
                    Enable
                </button>
                <button
                    className={`
                        h-9 rounded-md px-3 text-sm transition-colors disabled:pointer-events-none disabled:cursor-not-allowed 
                        bg-white text-gray-900 border border-input hover:bg-gray-50/90 disabled:text-gray-900/50
                    `}
                    onClick={exact().disable}
                >
                    Disable
                </button>
            </div>
        </div>
    );
};

export { Popup };
