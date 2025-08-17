import React, {useState} from 'react';
import Header from './components/Header';
import './styles/App.css';
import {OutlierTransaction, Transaction, Pattern, WindowSnapshot} from "./model/models";
import ChartsGrid from './components/ChartsGrid';
import WindowStatsCards from "./components/StatsCards";
import ListsGrid from "./components/ListsGrid";
import useSSE from "./hooks/useSSE";

const BlockchainFeeAnalyzer = () => {
    const MAX_RETENTION_ITEMS = 20;
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [outliers, setOutliers] = useState<OutlierTransaction[]>([]);
    const [patterns, setPatterns] = useState<Pattern[]>([]);
    const [stats, setStats] = useState<WindowSnapshot>({
      avgFeePerVByte: 0,
      medianFeePerVByte: 0,
      transactionsCount: 0,
      outliersCount: 0
    });

    const handleSSEMessage = (newTransaction: Transaction) => {
        updateTransactions(newTransaction);
    }

    const { isConnected, connectionStatus, connect, disconnect } = useSSE({
        url: "/api/v1/transactions/stream",
        onMessage: handleSSEMessage
    });

    // const handleReconnect = () => {
    //     console.log('Reconnecting...');
    //     connect();
    // };
    //
    // const handleDisconnect = () => {
    //     console.log('Disconnected...');
    //     disconnect();
    // };

    const updateTransactions = (newTx: Transaction) => {
        setTransactions(prev => {
            const updatedTransactions = [...prev, newTx]
            //prev.push(newTx);

            if (updatedTransactions.length > MAX_RETENTION_ITEMS) {
                prev.shift();
            }
            return updatedTransactions;
        });
        // setStats(prevState => {
        //     if (newTx) return newTx.windowSnapshot
        //     else return prevState
        // })
        // setOutliers(prev => {
        //     if (newTx.isOutlier) {
        //         const newOutlier: OutlierTransaction = {id: newTx.id, feePerVByte: newTx.feePerVByte, size: newTx.size}
        //         const updatedOutliers = [...prev, newOutlier]
        //         if (updatedOutliers.length > MAX_RETENTION_ITEMS) {
        //             return updatedOutliers.slice(-MAX_RETENTION_ITEMS)
        //         }
        //     }
        //     return prev
        // });
        // setPatterns(prev => {
        //     newTx.patternTypes.forEach(t => {
        //         const newPattern: Pattern = {type: t, metric: "", timestamp: newTx.timestamp}
        //         return [...prev, newPattern].slice(-MAX_RETENTION_ITEMS)
        //     })
        //
        //     return prev
        // })
    };

    return (
        <div className="app">
            <div className="app__container">
                <Header isConnected={isConnected} connectionStatus={connectionStatus}/>
                <WindowStatsCards stats={stats} />
                <ChartsGrid transactions={transactions} outliers={outliers}/>
                <ListsGrid transactions={transactions} patterns={patterns}/>
            </div>
        </div>
    );
};

export default BlockchainFeeAnalyzer;