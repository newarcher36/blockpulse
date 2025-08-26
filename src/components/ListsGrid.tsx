import React from 'react';
import PatternDetection from './PatternDetection';
import RecentTransactions from './RecentTransactions';
import '../styles/PatternsGrid.css';
import {ListsGridProps} from "../model/props";

const ListsGrid: React.FC<ListsGridProps> = ({transactionsListItems, patterns}) => {
    return (
        <div className="patterns-grid">
            <PatternDetection patterns={patterns}/>
            <RecentTransactions transactionListItems={transactionsListItems}/>
        </div>
    );
};

export default ListsGrid;