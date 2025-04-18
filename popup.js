const input = document.getElementById("intervalInput");
const toggle = document.getElementById("toggleEnable");
const endPercentageInput = document.getElementById("endPercentageInput");
const repeatCountInput = document.getElementById("repeatCountInput");

chrome.storage.sync.get(
    { intervalMs: 1, enabled: true, endPercentage: 99, maxRepeat: 1 },
    (data) => {
        input.value = data.intervalMs;
        toggle.checked = data.enabled;
        endPercentageInput.value = data.endPercentage;
        repeatCountInput.value = data.maxRepeat;
    }
);

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

endPercentageInput.addEventListener("change", () => {
    const newVal = parseFloat(endPercentageInput.value);
    if (!isNaN(newVal) && newVal >= 5 && newVal <= 100) {
        chrome.storage.sync.set({ endPercentage: newVal });
    }
});

repeatCountInput.addEventListener("change", () => {
    const newVal = parseInt(repeatCountInput.value);
    if (!isNaN(newVal) && newVal >= 0) {
        chrome.storage.sync.set({ maxRepeat: newVal });
    }
});
