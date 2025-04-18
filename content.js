/**
 * @fileoverview Automatically clicks the "Next video" button on a webpage
 * when the video is nearly finished, based on actual video time.
 * Reads configuration from Chrome storage and supports dynamic updates.
 */

const DEFAULT_INTERVAL_MS = 100; // Default polling interval
const END_PERCENTAGE = 0.99;     // Trigger next at 99% completion
const MAX_REPEAT = 1;            // Max times same video can loop before skipping

let currentInterval = null;
let delayMs = DEFAULT_INTERVAL_MS;
let isEnabled = true;

/**
 * Starts watching <video> playback and auto-clicks "Next video" when it ends.
 */
function startWatcher() {
    if (currentInterval) clearInterval(currentInterval); // Clear existing interval
    if (!isEnabled) return;

    let lastVideoSrc = null;
    let repeatCount = 0;

    currentInterval = setInterval(() => {
        try {
            const videoEl = $('video')[0];
            if (!videoEl || !videoEl.src || isNaN(videoEl.duration) || videoEl.duration === 0) return;

            const currentSrc = videoEl.src;
            const progress = videoEl.currentTime / videoEl.duration;

            if (progress >= END_PERCENTAGE) {
                if (currentSrc === lastVideoSrc) {
                    repeatCount++;
                } else {
                    repeatCount = 0;
                }

                lastVideoSrc = currentSrc;

                if (repeatCount >= MAX_REPEAT) {
                    const nextBtn = $('button[aria-label="Next video"]');
                    if (nextBtn.length > 0) {
                        console.log("⏭️ Skipping video (progress >= 99%)");
                        nextBtn[0].click();
                        repeatCount = 0;
                        lastVideoSrc = null;
                    }
                }
            }
        } catch (err) {
            console.error("🔴 Watcher error:", err);
            clearInterval(currentInterval); // Stop interval on error
        }
    }, delayMs);
}

/**
 * Loads initial configuration from Chrome's storage
 * and begins video observation.
 */
chrome.storage.sync.get(
    { intervalMs: DEFAULT_INTERVAL_MS, enabled: true },
    (data) => {
        delayMs = data.intervalMs || DEFAULT_INTERVAL_MS;
        isEnabled = data.enabled !== undefined ? data.enabled : true;
        startWatcher();
    }
);

/**
 * Listens for changes in the extension's storage and applies updates in real-time.
 */
chrome.storage.onChanged.addListener((changes) => {
    if (changes.intervalMs) delayMs = changes.intervalMs.newValue;
    if (changes.enabled !== undefined) isEnabled = changes.enabled.newValue;

    // Restart watcher with updated config
    startWatcher();
});

/**
 * Cleans up the interval on page unload to avoid memory leaks.
 */
window.addEventListener("beforeunload", () => {
    if (currentInterval) clearInterval(currentInterval);
});