import React, {useState} from 'react';
import Header from './components/Header';
import {useWebSocket} from './hooks/useWebSocket';
import './styles/App.css';
import RecentTransactions from './components/RecentTransactions';
import {Transaction} from "./model/models";

const FeeMarketComparator = () => {
    const [transactions, setTransactions] = useState([]);
    // const [outliers, setOutliers] = useState([]);
    // const [patterns, setPatterns] = useState([]);
    // const [stats, setStats] = useState({
    //   avgFeePerByte: 0,
    //   medianFeePerByte: 0,
    //   totalTransactions: 0,
    //   outliersCount: 0
    // });

    const {isConnected, connectionStatus} = useWebSocket({
        url: 'ws://localhost:8080/ws/topic/transactions',
        onMessage: handleWebSocketMessage
    });

    // Handle WebSocket messages
    function handleWebSocketMessage(data: Transaction) {
        updateTransactions(data);
        // switch (data.type) {
        //   case 'TRANSACTION_UPDATE':
        //     updateTransactions(data.transactions);
        //     break;
        //   case 'OUTLIER_DETECTED':
        //     setOutliers(prev => [...prev.slice(-49), data.outlier]);
        //     break;
        //   case 'PATTERN_DETECTED':
        //     setPatterns(prev => [...prev.slice(-9), data.pattern]);
        //     break;
        //   case 'STATS_UPDATE':
        //     setStats(data.stats);
        //     break;
        //   default:
        //     console.log('Unknown message type:', data.type);
        // }
    }

    const updateTransactions = (newTx: Transaction) => {
        setTransactions(prev => {
            const updated = [...prev, ...newTransactions].slice(-1000);
            return updated;
        });
    };

    return (
        <div className="app">
            <div className="app__container">
                <Header
                    isConnected={isConnected}
                    connectionStatus={connectionStatus}
                />

                {/*<StatsCards stats={stats} />*/}

                {/*<ChartsGrid */}
                {/*  transactions={transactions} */}
                {/*  outliers={outliers} */}
                {/*/>*/}

                <div className="patterns-grid">
                    {/*<PatternDetection patterns={patterns}/>*/}
                    <RecentTransactions transactions={transactions}/>
                </div>
            </div>
        </div>
    );
};

export default FeeMarketComparator;