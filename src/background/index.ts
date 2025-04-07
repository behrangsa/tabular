// Background script for the Tabular extension
chrome.action.onClicked.addListener(() => {
  // Open the tab manager page in a new tab when the extension icon is clicked
  chrome.tabs.create({ url: chrome.runtime.getURL("assets/tab-page.html") });
});
