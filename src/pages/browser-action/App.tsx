import React from 'react';
import Header from '../../components/Header';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <h1>Welcome to Tabular</h1>
        <p>This is a Chrome extension created with React, Vite, and SWC.</p>
        <p>The extension adds an icon to the toolbar and opens this page when clicked.</p>
      </main>
    </div>
  );
};

export default App;
