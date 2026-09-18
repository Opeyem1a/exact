const Popup = () => {
    return (
        <div className="w-60 p-4 flex flex-col gap-3 bg-[#F8F6FB] text-[#16131C]">
            <h1 className="font-semibold flex items-center gap-2">
                <span
                    aria-hidden="true"
                    className="w-2 h-2 rounded-full bg-[#9040D0]"
                />
                Exact
            </h1>
            <p className="text-xs text-[#6C6479]">
                Images and videos on Instagram, LinkedIn, X and YouTube arrive
                in grey. Rest your cursor on one and it develops into colour.
                Scrolling past doesn&rsquo;t count &mdash; media only opens when
                you stop. On YouTube, a video you start watching stays in colour
                while it plays.
            </p>
        </div>
    );
};

export { Popup };
