# Tabular Chrome Extension

A Chrome extension built with pnpm, Vite, React, and SWC. The extension adds an icon to the toolbar and opens a browser action page when clicked.

## Project Structure

```
tabular/
├── public/                  # Static assets
│   ├── manifest.json        # Chrome extension manifest
│   ├── background.js        # Compiled background script
│   └── icons/               # Extension icons
│       ├── icon-16.png
│       ├── icon-48.png
│       ├── icon-128.png
│       └── logo.svg
├── src/
│   ├── pages/
│   │   ├── background/      # Background script source
│   │   ├── content/         # Content scripts (if needed)
│   │   └── browser-action/  # Browser action page
│   ├── components/          # Reusable React components
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   └── assets/              # Non-public assets
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies and scripts
```

## Features

- Chrome Extension with browser action
- React for UI components
- TypeScript for type safety
- Vite for fast development and optimized builds
- SWC for fast compilation

## Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development server:
   ```bash
   pnpm dev
   ```

3. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory in this project

4. Build for production:
   ```bash
   pnpm build
   ```

## Adding New Features

To add new features to this extension:

1. Modify the background script in `src/pages/background/index.ts`
2. Add new React components in `src/components/`
3. Update the browser action page in `src/pages/browser-action/`
4. Add content scripts if needed in `src/pages/content/`

## License

ISC
