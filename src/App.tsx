import React, {useEffect, useState} from 'react';
import Header from './components/Header';
import './styles/App.css';
import {OutlierTransaction, Pattern, Transaction, WindowSnapshot} from "./model/models";
import WindowStatsCards from "./components/StatsCards";
import {updateOutliersList, updatePatternsList, updateTransactionsList} from "./utils/utils";
import ListsGrid from './components/ListsGrid';
import ChartsGrid from "./components/ChartsGrid";

const BlockchainFeeAnalyzer = () => {
    const MAX_RETENTION_ITEMS = 20;
    const [isConnected, setIsConnected] = useState(false);

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [outliers, setOutliers] = useState<OutlierTransaction[]>([]);
    const [patterns, setPatterns] = useState<Pattern[]>([]);
    const [stats, setStats] = useState<WindowSnapshot>({
      avgFeePerVByte: 0,
      medianFeePerVByte: 0,
      transactionsCount: 0,
      outliersCount: 0
    });

    useEffect(() => {
        const eventSource = new EventSource('/api/v1/transactions/stream');

        eventSource.onmessage = (event) => {
            const transaction = JSON.parse(event.data);
            updateTransactions(transaction);
        };

        eventSource.onopen = () => setIsConnected(true);
        eventSource.onerror = () => setIsConnected(false);

        return () => eventSource.close();
    }, []);

    const updateTransactions = (newTx: Transaction) => {
        setTransactions(prev => {
            return updateTransactionsList(prev, newTx, MAX_RETENTION_ITEMS);
        });
        setStats(prevState => {
            if (newTx) return newTx.windowSnapshot
            else return prevState
        })
        setOutliers(prev => {
            if (newTx.isOutlier) {
                const newOutlier: OutlierTransaction = {id: newTx.id, feePerVByte: newTx.feePerVByte, size: newTx.size}
                return updateOutliersList(prev, newOutlier, MAX_RETENTION_ITEMS);
            }
            return prev
        });
        setPatterns(prev => {
            newTx.patternTypes.forEach(t => {
                const newPattern: Pattern = {type: t, metric: "", timestamp: newTx.timestamp}
                return updatePatternsList(prev, newPattern, MAX_RETENTION_ITEMS,);
            })

            return prev
        })
    };

    return (
        <div className="app">
            <div className="app__container">
                <Header isConnected={isConnected}/>
                <WindowStatsCards stats={stats} />
                <ChartsGrid transactions={transactions} outliers={outliers}/>
                <ListsGrid transactions={transactions} patterns={patterns}/>
            </div>
        </div>
    );
};

export default BlockchainFeeAnalyzer;