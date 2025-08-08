import React, {useState} from 'react';
import Header from './components/Header';
import {useWebSocket} from './hooks/useWebSocket';
import './styles/App.css';
import RecentTransactions from './components/RecentTransactions';
import {OutlierTransaction, Transaction} from "./model/models";
import ChartsGrid from './components/ChartsGrid';
import WindowStatsCards from "./components/StatsCards";
import ListsGrid from "./components/ListsGrid";

const BlockchainFeeAnalyzer = () => {
    const MAX_OUTLIERS = 20;
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [outliers, setOutliers] = useState<OutlierTransaction[]>([]);
    const [patterns, setPatterns] = useState([]);
    const [stats, setStats] = useState({
      avgFeePerByte: 0,
      medianFeePerByte: 0,
      totalTransactions: 0,
      outliersCount: 0
    });

    const handleWebSocketMessage = (data: Transaction) => {
        updateTransactions(data);
    }

    const {isConnected, connectionStatus} = useWebSocket({
        url: 'ws://localhost:8080/ws/topic/transactions',
        onMessage: handleWebSocketMessage
    });

    const updateTransactions = (newTx: Transaction) => {
        setStats(prevState => {
            prevState.totalTransactions = newTx.windowStats.totalTransactions;
            prevState.outliersCount = newTx.windowStats.outliersCount;
            prevState.avgFeePerByte = newTx.windowStats.avgFeePerByte;
            prevState.medianFeePerByte = newTx.windowStats.medianFeePerByte;
            return prevState
        })
        setOutliers(prev => {
            if (newTx.isOutlier) {
                const outlier: OutlierTransaction = {id: newTx.id, feePerVByte: newTx.feePerVByte, size: newTx.size}
                const updatedOutliers = [...prev, outlier]
                if (updatedOutliers.length > MAX_OUTLIERS) {
                    return updatedOutliers.slice(-MAX_OUTLIERS)
                }
            }
            return prev
        });
        setTransactions(prev => {
            const updated = [...prev, newTx];

            if (updated.length > 100) {
                return updated.slice(-100);
            }
            return updated;
        });
    };

    return (
        <div className="app">
            <div className="app__container">
                <Header isConnected={isConnected} connectionStatus={connectionStatus}/>
                <WindowStatsCards stats={stats} />
                <ChartsGrid transactions={transactions} outliers={outliers}/>
                <ListsGrid transactions={transactions}/>
            </div>
        </div>
    );
};

export default BlockchainFeeAnalyzer;