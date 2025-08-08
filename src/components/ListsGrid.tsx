import React from 'react';
import PatternDetection from './PatternDetection';
import RecentTransactions from './RecentTransactions';
import '../styles/PatternsGrid.css';
import {TransactionProps} from "../model/props";

const ListsGrid: React.FC<TransactionProps> = ({transactions}) => {
    return (
        <div className="patterns-grid">
            <PatternDetection patterns={transactions}/>
            <RecentTransactions transactions={transactions}/>
        </div>
    );
};

export default ListsGrid;