import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/icons/logo.svg" alt="Tabular Logo" className="logo" width="32" height="32" />
        <h1>Tabular</h1>
      </div>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
