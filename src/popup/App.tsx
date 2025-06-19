import { exact } from '../core';

const Popup = () => {
    return (
        <div className="min-w-60">
            <h1 className="text-2xl">Exact</h1>
            <div className="flex gap-4">
                <button onClick={exact().enable}>Enable</button>
                <button onClick={exact().disable}>Disable</button>
            </div>
        </div>
    );
};

export { Popup };
