// background.js

const ICONS = {
    enabled: {
        "48": "icon48.png",
        "128": "icon128.png"
    },
    disabled: {
        "48": "icon48-gray.png",
        "128": "icon128-gray.png"
    }
};

// Update icon based on storage state
function updateIconByState(enabled) {
    chrome.action.setIcon({ path: enabled ? ICONS.enabled : ICONS.disabled });
}

// Load initial icon state from storage
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.sync.get({ enabled: true }, (data) => {
        updateIconByState(data.enabled);
    });
});

// Also run on extension install
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get({ enabled: true }, (data) => {
        updateIconByState(data.enabled);
    });
});

// React to toggle changes
chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
        updateIconByState(changes.enabled.newValue);
    }
});

chrome.runtime.onMessage.addListener((msg) => {
    if (msg.updateIcon !== undefined) {
        updateIconByState(msg.updateIcon);
    }
});
