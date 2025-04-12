/*
 * Background script for the Tabular MV3 extension.
 */

const isCurrentExtensionTab = (tab: chrome.tabs.Tab): boolean => {
  const extensionBaseUrl = chrome.runtime.getURL('');

  return !!tab.url && tab.url.startsWith(extensionBaseUrl);
}

const isPinnedTab = (tab: chrome.tabs.Tab): boolean => {
  // Check if the tab is pinned
  return !!tab.pinned;
}

const isCloseableTab = (tab: chrome.tabs.Tab): boolean => {
  // Check if the tab is closeable
  if (tab.id) {
    return !isCurrentExtensionTab(tab) && !isPinnedTab(tab);
  } else {
    return false;
  }
}

const handleActionClicked = () => {
  chrome.tabs.query({}, (tabs) => {
    const now = new Date();
    const closeableTabs = tabs.filter(isCloseableTab)

    closeableTabs.forEach((tab) => {
      chrome.tabs.remove(tab.id!);
    });
  });
}

// Add an onClicked listener
chrome.action.onClicked.addListener(handleActionClicked);

