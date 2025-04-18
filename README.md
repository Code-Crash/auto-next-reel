
# Auto Next Reel Extension

A Chrome Extension that automatically skips to the **next reel** when the current video finishes or is detected to be looping. It intelligently monitors video playback using `video.currentTime` and `video.duration`, ensuring accuracy even for short or repeated reels.

## 🚀 Features

- ⏭️ Automatically skips to the next reel when the current video is near completion.
- 🔄 Detects repeated or looping short videos to avoid getting stuck.
- 🕒 Uses actual `video.currentTime` and `duration` instead of unreliable slider percentages.
- ⚙️ Configurable polling interval and enable/disable toggle.
- 🌐 Works across multiple platforms using `<video>` elements and `"Next video"` buttons.
- 🧠 Lightweight and runs in the background even on tab switches.

## 🧩 How It Works

- Monitors `<video>` elements on the page.
- Calculates playback progress with `currentTime / duration`.
- When video reaches 99% (or repeats), it clicks `"Next video"` (`aria-label="Next video"`) button.
- Prevents re-clicks by tracking video `src` and repeat count.
- Respects user settings configured via the extension popup.

## 📁 File Structure

```
next-reel-extension/
├── .gitignore
├── background.js       # Handles icon toggles and persistent alarms
├── content.js          # Main logic for detecting video progress and clicking next
├── icon48.png
├── icon48-gray.png
├── icon128.png
├── icon128-gray.png
├── jquery.min.js
├── manifest.json
├── popup.css           # Styles for popup UI
├── popup.html          # Extension popup UI with controls
├── popup.js            # Syncs user settings with chrome.storage
└── README.md
```

## 🔧 Configuration

The extension offers a simple popup UI to control:

- `✔️ Auto Next`: Toggle to enable or disable automatic skipping.
- `⏱️ Retry Delay`: Interval (in milliseconds) between progress checks.
- `🔁 Repeat Count`: Number of times a reel is allowed to repeat before skipping.

Settings are saved via `chrome.storage.sync` and applied immediately.

## 🛠 Setup Instructions

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the folder containing this extension.

You’ll see the 🎬 Next Reel icon in your toolbar. Open it to configure!

## 🔍 Supported Platforms

Works best on platforms that:
- Use a `<video>` tag for playback
- Provide a `"Next video"` button with `aria-label="Next video"`

Tested on:
- YouTube (shorts & playlists)
- Instagram Web (reels): TODO
- Facebook Watch: TODO
- Learning platforms with modular videos: TODO

## 🧠 Technical Highlights

- Manifest v3 support using `service_worker`
- Background icon switching (green/gray) based on enable state
- Graceful handling of multiple videos and edge cases
- No third-party tracking — pure client-side logic

## 📃 License

MIT License

---

Created with ❤️ to skip the wait, keep the reels rolling, and let lazy innovation shine 🚀.