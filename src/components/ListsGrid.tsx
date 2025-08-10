import React from 'react';
import PatternDetection from './PatternDetection';
import RecentTransactions from './RecentTransactions';
import '../styles/PatternsGrid.css';
import {ListsGridProps} from "../model/props";

const ListsGrid: React.FC<ListsGridProps> = ({transactions, patterns}) => {
    return (
        <div className="patterns-grid">
            <PatternDetection patterns={patterns}/>
            <RecentTransactions transactions={transactions}/>
        </div>
    );
};

export default ListsGrid;