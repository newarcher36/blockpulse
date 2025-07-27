import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import ChartsGrid from './components/ChartsGrid';
import PatternsGrid from './components/PatternsGrid';
import { useWebSocket } from './hooks/useWebSocket';
import { useTransactionAnalysis } from './hooks/useTransactionAnalysis';
import './styles/App.css';

const FeeMarketComparator = () => {
  const [transactions, setTransactions] = useState([]);
  const [outliers, setOutliers] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [stats, setStats] = useState({
    avgFeePerByte: 0,
    medianFeePerByte: 0,
    totalTransactions: 0,
    outliersCount: 0
  });

  // Custom hooks for WebSocket and analysis logic
  const { isConnected, connectionStatus } = useWebSocket({
    url: 'ws://localhost:8080/ws/fee-market',
    onMessage: handleWebSocketMessage
  });

  const { analyzeTransactions } = useTransactionAnalysis({
    onOutliersUpdate: setOutliers,
    onPatternsUpdate: setPatterns,
    onStatsUpdate: setStats
  });

  // Handle WebSocket messages
  function handleWebSocketMessage(data) {
    switch (data.type) {
      case 'TRANSACTION_UPDATE':
        updateTransactions(data.transactions);
        break;
      case 'OUTLIER_DETECTED':
        setOutliers(prev => [...prev.slice(-49), data.outlier]);
        break;
      case 'PATTERN_DETECTED':
        setPatterns(prev => [...prev.slice(-9), data.pattern]);
        break;
      case 'STATS_UPDATE':
        setStats(data.stats);
        break;
      default:
        console.log('Unknown message type:', data.type);
    }
  }

  // Update transactions and trigger analysis
  const updateTransactions = (newTransactions) => {
    setTransactions(prev => {
      const updated = [...prev, ...newTransactions].slice(-1000);
      analyzeTransactions(updated);
      return updated;
    });
  };

  // Generate mock data for demonstration
  const generateMockData = () => {
    const mockTx = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      feePerByte: Math.max(1, Math.random() * 50 + Math.random() * 200 * (Math.random() > 0.9 ? 1 : 0)),
      size: Math.floor(Math.random() * 1000) + 200,
      timestamp: Date.now(),
      blockHeight: Math.floor(Math.random() * 1000) + 800000,
      confirmationTime: Math.floor(Math.random() * 3600) + 60
    };
    updateTransactions([mockTx]);
  };

  // Auto-generate mock data when not connected
  useEffect(() => {
    if (!isConnected) {
      const interval = setInterval(generateMockData, 2000);
      return () => clearInterval(interval);
    }
  }, [isConnected]);

  return (
    <div className="app">
      <div className="app__container">
        <Header 
          isConnected={isConnected} 
          connectionStatus={connectionStatus} 
        />
        
        <StatsCards stats={stats} />
        
        <ChartsGrid 
          transactions={transactions} 
          outliers={outliers} 
        />
        
        <PatternsGrid 
          patterns={patterns} 
          transactions={transactions}
          stats={stats}
        />
      </div>
    </div>
  );
};

export default FeeMarketComparator;