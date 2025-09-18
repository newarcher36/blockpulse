// Removed icon imports; using a status dot instead
import '../styles/Header.css';
import React from "react";
import {HeaderProps} from '../model/props';
import bitcoinLogo from '../assets/images/logo-bitcoin.png';
import githubImage from '../assets/images/github-image.svg';


const Header: React.FC<HeaderProps> = ({ isConnected}) => {
  return (
    <header className="header">
      <h1 className="header__title">
        <img src={bitcoinLogo} alt="Bitcoin logo" className="header__title-icon" />
        Bitcoin Fee Analyzer
        <div className={`connection-indicator ${isConnected ? 'connection-indicator--connected' : 'connection-indicator--disconnected'}`}>
          <span
            className="title-info__icon title-info__icon--small"
            data-tooltip={isConnected ? 'Connected to live data stream.' : 'Disconnected. Attempting to reconnect...'}
          >
            <span className="connection-indicator__dot" />
          </span>
        </div>
      </h1>

      <div className="header__status">
        <a
          href="https://github.com/newarcher36"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View GitHub profile"
          className="header__github"
        >
          <img src={githubImage} alt="GitHub" className="header__github-icon" />
          <span className="header__github-text">Git Hub</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
