let currentInterval = null;
let delayMs = 500;
let isEnabled = true;

function startWatcher() {
    if (currentInterval) clearInterval(currentInterval);
    if (!isEnabled) return;

    currentInterval = setInterval(() => {
        try {
            const slider = $('div[role="slider"]');
            const value = slider.attr('aria-valuenow');

            if (value && !isNaN(value) && parseInt(value) >= 90) {
                const button = $('button[aria-label="Next video"]');
                if (button.length > 0) {
                    button.click();
                }
            }
        } catch (err) {
            console.error("Next Reel Error:", err);
            clearInterval(currentInterval);
        }
    }, delayMs);
}

// Load initial config
chrome.storage.sync.get({ intervalMs: 500, enabled: true }, (data) => {
    delayMs = data.intervalMs;
    isEnabled = data.enabled;
    startWatcher();
});

// React to config changes
chrome.storage.onChanged.addListener((changes) => {
    if (changes.intervalMs) delayMs = changes.intervalMs.newValue;
    if (changes.enabled !== undefined) isEnabled = changes.enabled.newValue;
    startWatcher();
});

// Cleanup
window.addEventListener("beforeunload", () => {
    if (currentInterval) clearInterval(currentInterval);
});
