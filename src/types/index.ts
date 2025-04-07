// Define global types for the application
export interface TabRecord {
  id: number;
  title: string;
  url: string;
  favIconUrl?: string;
  lastAccessed: Date;
}

export interface TabDatabase {
  storeTabs: (tabs: chrome.tabs.Tab[]) => Promise<void>;
  getTabById: (id: number) => Promise<TabRecord | undefined>;
  getAllTabs: () => Promise<TabRecord[]>;
  removeTab: (id: number) => Promise<void>;
}
