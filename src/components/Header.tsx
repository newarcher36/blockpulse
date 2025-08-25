import {Wifi, WifiOff} from 'lucide-react';
import '../styles/Header.css';
import React from "react";
import {HeaderProps} from "../model/props";


const Header: React.FC<HeaderProps> = ({ isConnected}) => {
  return (
    <header className="header">
      <h1 className="header__title">Bitcoin Fee Comparator</h1>

      <div className="header__status">
        <div className={`connection-indicator ${isConnected ? 'connection-indicator--connected' : 'connection-indicator--disconnected'}`}>
          {isConnected ? (
            <Wifi className="connection-indicator__icon" />
          ) : (
            <WifiOff className="connection-indicator__icon" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;