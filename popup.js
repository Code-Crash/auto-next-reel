const input = document.getElementById("intervalInput");
const toggle = document.getElementById("toggleEnable");

chrome.storage.sync.get({ intervalMs: 1, enabled: true }, (data) => {
    input.value = data.intervalMs;
    toggle.checked = data.enabled;
});

input.addEventListener("change", () => {
    const newVal = parseInt(input.value);
    if (!isNaN(newVal) && newVal >= 100) {
        chrome.storage.sync.set({ intervalMs: newVal });
    }
});

toggle.addEventListener("change", () => {
    const newValue = toggle.checked;
    chrome.storage.sync.set({ enabled: newValue });
    chrome.runtime.sendMessage({ updateIcon: newValue });
});

