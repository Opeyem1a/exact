/**
 * Exact's "key". main.css locks every image and video; this script decides
 * which ones are open by setting attributes that main.css reads.
 *
 * Media counts as hovered based on where the pointer is, not CSS :hover.
 * Sites cover their media with links, click-catchers and player controls,
 * so the media element itself rarely receives :hover.
 */

console.log('[exact] Encouraging intention in your browsing.');

/** Keep in sync with the media selectors in main.css */
const MEDIA_SELECTOR = 'img, video, [style*="background-image"]';
const OPEN_ATTR = 'data-exact-open';
const PLAYING_ATTR = 'data-exact-playing';

/**
 * Only YouTube is somewhere you settle in to watch. Other sites autoplay their
 * videos, so playback there isn't a choice and videos stay open only while
 * held, like images.
 */
const PINS_PLAYING_VIDEOS = /(^|\.)youtube\.com$/.test(location.hostname);

/** How long the pointer must rest on media before it opens */
const DWELL_MS = 200;
/** How long media stays open after the pointer leaves it */
const GRACE_MS = 300;
/** How long after the last scroll event before scrolling counts as done */
const SCROLL_SETTLE_MS = 150;

interface PendingChange {
    kind: 'open' | 'close';
    timeoutId: number;
}

const pendingChanges = new Map<Element, PendingChange>();
let focused: Element | null = null;
let pointer: { x: number; y: number } | null = null;
let scrollSettleTimeoutId = 0;
let animationFrameId = 0;

function getMediaAt(x: number, y: number): Element[] {
    const hits = document.elementsFromPoint(x, y);
    // An open post modal shouldn't reveal the dimmed feed behind it
    const dialog = hits[0]?.closest('[role="dialog"]');
    return hits.filter(
        (el) => el.matches(MEDIA_SELECTOR) && (!dialog || dialog.contains(el))
    );
}

/**
 * Keyboard focus acts like a pointer resting at the centre of the focused
 * element, plus any media inside it. The centre matters because the focusable
 * link is often an overlay beside the media rather than around it.
 */
function getFocusedMedia(): Element[] {
    if (!focused?.isConnected) return [];
    const rect = focused.getBoundingClientRect();
    return [
        ...getMediaAt(rect.x + rect.width / 2, rect.y + rect.height / 2),
        ...Array.from(focused.querySelectorAll(MEDIA_SELECTOR)),
    ];
}

function open(el: Element) {
    el.setAttribute(OPEN_ATTR, '');
    if (el instanceof HTMLVideoElement && !el.paused) markPlaying(el);
}

function close(el: Element) {
    el.removeAttribute(OPEN_ATTR);
}

function schedule(el: Element, kind: PendingChange['kind'], delayMs: number) {
    const current = pendingChanges.get(el);
    if (current?.kind === kind) return;
    clearTimeout(current?.timeoutId);

    const timeoutId = window.setTimeout(() => {
        pendingChanges.delete(el);
        if (kind === 'open') open(el);
        else close(el);
    }, delayMs);
    pendingChanges.set(el, { kind, timeoutId });
}

function cancel(el: Element) {
    clearTimeout(pendingChanges.get(el)?.timeoutId);
    pendingChanges.delete(el);
}

function update() {
    const focusedMedia = new Set(getFocusedMedia());
    const underPointer = pointer ? getMediaAt(pointer.x, pointer.y) : [];
    const held = new Set([...underPointer, ...focusedMedia]);

    for (const el of held) {
        if (el.hasAttribute(OPEN_ATTR)) {
            cancel(el);
        } else if (focusedMedia.has(el)) {
            // Keyboard focus is already a deliberate choice, so skip the dwell
            cancel(el);
            open(el);
        } else if (scrollSettleTimeoutId) {
            // Content sliding under a parked pointer isn't a choice either
            cancel(el);
        } else {
            schedule(el, 'open', DWELL_MS);
        }
    }

    for (const [el, change] of pendingChanges) {
        if (change.kind === 'open' && !held.has(el)) cancel(el);
    }

    document
        .querySelectorAll(`[${OPEN_ATTR}]:not([${PLAYING_ATTR}])`)
        .forEach((el) => {
            if (!held.has(el)) schedule(el, 'close', GRACE_MS);
        });
}

function requestUpdate() {
    if (animationFrameId) return;
    animationFrameId = requestAnimationFrame(() => {
        animationFrameId = 0;
        update();
    });
}

/**
 * A video that plays while open stays open until it pauses, ends, loads a new
 * source, or leaves the viewport, even if the pointer moves away.
 */
const offscreenObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (!entry.isIntersecting) unmarkPlaying(entry.target);
    }
});

function markPlaying(el: Element) {
    if (!PINS_PLAYING_VIDEOS) return;
    el.setAttribute(PLAYING_ATTR, '');
    offscreenObserver.observe(el);
}

function unmarkPlaying(el: Element) {
    if (!el.hasAttribute(PLAYING_ATTR)) return;
    el.removeAttribute(PLAYING_ATTR);
    offscreenObserver.unobserve(el);
    requestUpdate();
}

window.addEventListener(
    'pointermove',
    (event) => {
        pointer = { x: event.clientX, y: event.clientY };
        requestUpdate();
    },
    { passive: true }
);

document.addEventListener('pointerout', (event) => {
    // No relatedTarget means the pointer left the page entirely
    if (event.relatedTarget) return;
    pointer = null;
    requestUpdate();
});

window.addEventListener(
    'scroll',
    () => {
        clearTimeout(scrollSettleTimeoutId);
        scrollSettleTimeoutId = window.setTimeout(() => {
            scrollSettleTimeoutId = 0;
            requestUpdate();
        }, SCROLL_SETTLE_MS);
        requestUpdate();
    },
    // Capture so scrolling inside nested scroll containers counts too
    { capture: true, passive: true }
);

/**
 * New media can appear under a resting pointer without it moving, like the
 * next Instagram story. It opens after the usual dwell, as if the pointer had
 * just arrived.
 */
new MutationObserver(requestUpdate).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributeFilter: ['src', 'srcset'],
});

document.addEventListener('focusin', (event) => {
    const target = event.target;
    // Only visible (keyboard) focus: clicking also focuses buttons and links,
    // which would otherwise pin their media open after the pointer leaves
    if (!(target instanceof Element) || !target.matches(':focus-visible')) {
        return;
    }
    focused = target;
    requestUpdate();
});

document.addEventListener('focusout', () => {
    focused = null;
    requestUpdate();
});

// Media events don't bubble, so these listen in the capture phase
document.addEventListener(
    'playing',
    (event) => {
        const target = event.target;
        if (
            target instanceof HTMLVideoElement &&
            target.hasAttribute(OPEN_ATTR)
        )
            markPlaying(target);
    },
    true
);

for (const type of ['pause', 'ended']) {
    document.addEventListener(
        type,
        (event) => {
            if (event.target instanceof HTMLVideoElement)
                unmarkPlaying(event.target);
        },
        true
    );
}

// A new source (e.g. YouTube autoplaying the next video) is new content
document.addEventListener(
    'emptied',
    (event) => {
        const target = event.target;
        if (!(target instanceof HTMLVideoElement)) return;
        cancel(target);
        close(target);
        unmarkPlaying(target);
        // Re-check in case the pointer is still resting on it
        requestUpdate();
    },
    true
);
