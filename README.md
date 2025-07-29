# Google Meet Brightness Filter Chrome Extension

A Chrome extension that adds a brightness control slider to Google Meet video calls.

## Features

- Real-time brightness adjustment for all video elements in Google Meet
- Fixed-position slider in the top-right corner of the screen
- Brightness range: 50% to 200% (0.5x to 2.0x)
- Automatic detection of new video elements (participants joining/leaving)
- Clean, minimal UI that doesn't interfere with Meet's interface

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top-right corner
3. Click "Load unpacked" and select the `google-meet-brightness-filter` folder
4. The extension will be installed and ready to use

## Usage

1. Join any Google Meet call at `https://meet.google.com/*`
2. You'll see a brightness control slider in the top-right corner
3. Move the slider to adjust the brightness of all video feeds
4. The current brightness percentage is displayed below the slider

## Files Structure

- `manifest.json` - Extension configuration (Manifest V3)
- `content.js` - Main functionality script
- `styles.css` - UI styling for the brightness slider
- `README.md` - This documentation

## Technical Details

- Uses Manifest V3 for Chrome extensions
- Content script targets `https://meet.google.com/*`
- Applies CSS `filter: brightness()` to all `<video>` elements
- Uses MutationObserver to detect dynamically added video elements
- Slider specifications:
  - Min: 0.5 (50% brightness)
  - Max: 2.0 (200% brightness)
  - Step: 0.01
  - Default: 1.0 (100% brightness)

## Browser Compatibility

- Chrome (Manifest V3 compatible)
- Edge (Chromium-based)
- Other Chromium-based browsers

## License

This project is open source and available under the MIT License.
