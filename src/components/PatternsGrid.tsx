import React from 'react';
import PatternDetection from './PatternDetection';
import RecentTransactions from './RecentTransactions';
import '../styles/PatternsGrid.css';
import {PatternsGridProps} from "../model/models";

const PatternsGrid: React.FC<PatternsGridProps> = ({patterns, transactions, stats}) => {
    return (
        <div className="patterns-grid">
            <PatternDetection patterns={patterns}/>
            <RecentTransactions transactions={transactions}/>
        </div>
    );
};

export default PatternsGrid;