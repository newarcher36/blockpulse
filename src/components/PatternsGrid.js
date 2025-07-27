import React from 'react';
import PatternDetection from './PatternDetection';
import RecentTransactions from './RecentTransactions';
import '../styles/PatternsGrid.css';

const PatternsGrid = ({ patterns, transactions, stats }) => {
  return (
    <div className="patterns-grid">
      <PatternDetection patterns={patterns} />
      <RecentTransactions transactions={transactions} stats={stats} />
    </div>
  );
};

export default PatternsGrid;