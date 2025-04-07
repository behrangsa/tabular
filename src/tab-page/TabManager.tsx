import React, { useState, useEffect } from 'react';
import { useTabDatabase } from '../services/db';
import './TabManager.css';

type Tab = chrome.tabs.Tab;

const TabManager: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [loading, setLoading] = useState(true);
  const db = useTabDatabase();

  // Load all tabs when component mounts
  useEffect(() => {
    const fetchTabs = async () => {
      try {
        setLoading(true);
        // Query all tabs from Chrome
        const chromeTabs = await chrome.tabs.query({});
        setTabs(chromeTabs);
        
        // Store tabs in IndexedDB
        if (db) {
          await db.storeTabs(chromeTabs);
        }
      } catch (error) {
        console.error('Error fetching tabs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTabs();
  }, [db]);

  // Function to close a tab
  const closeTab = async (tabId: number) => {
    try {
      await chrome.tabs.remove(tabId);
      setTabs(tabs.filter(tab => tab.id !== tabId));
      
      // Update IndexedDB
      if (db) {
        await db.removeTab(tabId);
      }
    } catch (error) {
      console.error('Error closing tab:', error);
    }
  };

  return (
    <div className="tab-manager">
      <header>
        <h1>Tabular - Tab Manager</h1>
        <p>Manage your browser tabs</p>
      </header>
      
      <main>
        {loading ? (
          <p>Loading tabs...</p>
        ) : (
          <div className="tab-list">
            {tabs.length === 0 ? (
              <p>No tabs found</p>
            ) : (
              <ul>
                {tabs.map(tab => (
                  <li key={tab.id} className="tab-item">
                    <div className="tab-info">
                      {tab.favIconUrl && (
                        <img 
                          src={tab.favIconUrl} 
                          alt="Favicon" 
                          className="tab-favicon" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                      <div className="tab-details">
                        <h3 className="tab-title">{tab.title}</h3>
                        <p className="tab-url">{tab.url}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => tab.id && closeTab(tab.id)}
                      aria-label={`Close tab: ${tab.title}`}
                    >
                      Close
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>

    </div>
  );
};

export default TabManager;
