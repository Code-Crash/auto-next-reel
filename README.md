# Auto Next Reel Extension

A Chrome Extension that automatically clicks the **"Next Reel"** button on supported reel platforms (e.g., YouTube) when the playback slider reaches the end. The extension intelligently calculates the slider progress speed and dynamically adjusts its behavior to ensure accurate syncing with the reel playback.

## 🚀 Features

- ⏱️ Automatically detects when a reel is about to finish.
- 📈 Dynamically calculates the playback speed to adjust the slider threshold.
- 🔁 Clicks the "Next video" button only once per reel (with cooldown).
- ⚙️ Customizable polling interval via Chrome extension storage.
- 🧠 Lightweight, non-intrusive, and efficient.

## 🧩 How It Works

- Periodically polls the progress slider (`div[role="slider"]`).
- Tracks the `aria-valuenow` (percentage complete).
- Estimates the speed at which the slider value is changing.
- Predicts when the reel will end and clicks the `"Next Reel"` button.
- Ensures no repeated or accidental clicks via a cooldown timer.

## 📁 File Structure

```
next-reel-extension/
├── content.js
├── icon48.png
├── icon128.png
├── jquery.min.js
├── manifest.json
├── popup.css
├── popup.html
├── popup.js
└── README.md
```

## 🔧 Configuration

You can control:
- `intervalMs`: Polling interval in milliseconds (default: `1ms`)
- `enabled`: Enable or disable the extension in real-time

Settings are saved using Chrome's `chrome.storage.sync`.

## 🛠 Setup Instructions

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the folder containing this extension.

## 🧪 Supported Platforms

This extension was designed for platforms using a `<div role="slider">` for the playback progress and a `"Next Reel"` button with `aria-label="Next Reel"` (e.g., YouTube, playlists, some learning platforms). It can be customized for others.

## 📃 License

MIT License

---

Created with ❤️ to skip the wait, keep the reels rolling, embrace laziness, and innovate 🚀.
