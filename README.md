# Tabular - Chrome Tab Manager Extension

A Chrome extension for managing browser tabs with IndexedDB storage.

## Features

- View all open tabs in one place
- Close tabs directly from the manager
- Persistent storage using IndexedDB

## Tech Stack

- React
- TypeScript
- Vite
- IndexedDB (via idb)
- Chrome Extension API

## Development

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Start the development server
   ```
   npm run dev
   ```

## Building for Production

```
npm run build
```

This will create a `dist` folder with the compiled extension.

## Loading the Extension in Chrome

1. Build the extension using `npm run build`
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `dist` folder
5. The extension should now be installed and visible in your toolbar

## Usage

Click the extension icon in the Chrome toolbar to open the tab manager in a new tab.

## Project Structure

```
tabular/
├── public/                # Static assets
│   ├── manifest.json      # Chrome extension manifest
│   └── icons/             # Extension icons
├── src/
│   ├── tab-page/          # Tab manager page
│   │   ├── TabManager.tsx # Main component
│   │   ├── index.tsx      # Entry point
│   │   └── *.css          # Styles
│   ├── background/        # Background scripts
│   ├── services/          # Service modules
│   │   └── db.ts          # IndexedDB service
│   └── types/             # TypeScript type definitions
└── ...                    # Config files
