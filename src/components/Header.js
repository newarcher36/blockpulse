import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import '../styles/Header.css';

const Header = ({ isConnected, connectionStatus }) => {
  return (
    <header className="header">
      <h1 className="header__title">Fee Market Comparator</h1>
      
      <div className="header__status">
        <div className={`connection-indicator ${isConnected ? 'connection-indicator--connected' : 'connection-indicator--disconnected'}`}>
          {isConnected ? (
            <Wifi className="connection-indicator__icon" />
          ) : (
            <WifiOff className="connection-indicator__icon" />
          )}
          <span className="connection-indicator__text">
            {connectionStatus}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;