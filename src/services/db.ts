import { openDB, DBSchema } from 'idb';
import { useEffect, useState } from 'react';
import { TabRecord, TabDatabase } from '../types';

interface TabDBSchema extends DBSchema {
  tabs: {
    key: number;
    value: TabRecord;
    indexes: {
      'by-last-accessed': Date;
    };
  };
}

const DB_NAME = 'tabular-db';
const DB_VERSION = 1;

// Function to open and initialize the database
export const openTabDB = async () => {
  const db = await openDB<TabDBSchema>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      const tabStore = db.createObjectStore('tabs', { keyPath: 'id' });
      tabStore.createIndex('by-last-accessed', 'lastAccessed');
    },
  });
  return db;
};

// Custom hook to use the database
export const useTabDatabase = () => {
  const [database, setDatabase] = useState<TabDatabase | null>(null);

  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await openTabDB();
        
        setDatabase({
          // Store multiple tabs
          storeTabs: async (tabs: chrome.tabs.Tab[]) => {
            const tx = db.transaction('tabs', 'readwrite');
            const store = tx.objectStore('tabs');
            
            // Convert chrome.tabs.Tab to TabRecord and store each tab
            for (const tab of tabs) {
              if (tab.id) {
                await store.put({
                  id: tab.id,
                  title: tab.title || 'Untitled',
                  url: tab.url || '',
                  favIconUrl: tab.favIconUrl,
                  lastAccessed: new Date(),
                });
              }
            }
            
            await tx.done;
          },
          
          // Get a tab by ID
          getTabById: async (id: number) => {
            return db.get('tabs', id);
          },
          
          // Get all tabs
          getAllTabs: async () => {
            return db.getAll('tabs');
          },
          
          // Remove a tab
          removeTab: async (id: number) => {
            await db.delete('tabs', id);
          },
        });
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };
    
    initDB();
    
    return () => {
      // Cleanup if necessary
    };
  }, []);

  return database;
};
