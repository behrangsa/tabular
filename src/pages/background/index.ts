// This is the background service worker that listens for browser action clicks
chrome.action.onClicked.addListener(() => {
  // Open a new tab with our browser action page
  chrome.tabs.create({
    url: chrome.runtime.getURL('src/pages/browser-action/index.html')
  });
});

console.log('Background script initialized');
