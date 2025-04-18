/**
 * @fileoverview Automatically clicks the "Next video" button on a webpage when
 * a slider (with role="slider") reaches a value of 90 or higher.
 * Observes configuration from Chrome storage and supports dynamic updates.
 */

const DEFAULT_INTERVAL_MS = 0; // Default polling interval
const SLIDER_THRESHOLD = 99;     // Value to trigger "Next video"
let currentInterval = null;
let delayMs = DEFAULT_INTERVAL_MS;
let isEnabled = true;

/**
 * Starts watching the slider at regular intervals.
 * If slider value >= SLIDER_THRESHOLD, clicks the "Next video" button.
 */
function startWatcher() {
    if (currentInterval) clearInterval(currentInterval); // Clear any existing interval
    if (!isEnabled) return;

    currentInterval = setInterval(() => {
        try {
            const slider = $('div[role="slider"]');
            if (!slider.length) return;
            const value = slider.attr('aria-valuenow');
            if (value && !isNaN(value) && parseInt(value, 10) >= SLIDER_THRESHOLD) {
                const button = $('button[aria-label="Next video"]');
                if (button.length > 0) {
                    button[0].click(); // Simulate clicking "Next video"
                }
            }
        } catch (err) {
            clearInterval(currentInterval); // Stop interval on error
        }
    }, delayMs);
}

/**
 * Loads initial configuration from Chrome's storage
 * and begins slider observation.
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

    // Restart watcher with new configuration
    startWatcher();
});

/**
 * Cleans up the interval on page unload to avoid memory leaks.
 */
window.addEventListener("beforeunload", () => {
    if (currentInterval) clearInterval(currentInterval);
});