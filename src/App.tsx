import React, {useState} from 'react';
import Header from './components/Header';
import './styles/App.css';
import {
    AnalyzedTransactionEvent,
    FeeOutlier,
    FeePriceClassification,
    DetectedFeePattern,
    WindowSnapshot,
    FeeTrendPoint
} from "./model/models";
import WindowSnapshotCards from "./components/WindowSnapshotCards";
import {updateFeeTrendPointsList, updateFeeOutliersList, updatePatternsList, updateTransactionListItem} from "./utils/utils";
import ListsGrid from './components/ListsGrid';
import ChartsGrid from "./components/ChartsGrid";
import {PatternMetric} from "./model/enums";
import SseConnector from './components/SseConnector';

const BlockchainFeeAnalyzer = () => {
    const MAX_RETENTION_ITEMS = 100;
    const MAX_RETENTION_TX_LIST_ITEMS = 30; // separate retention for list items
    const [isConnected, setIsConnected] = useState(false);
    const [transactionListItems, setTransactionListItems] = useState<FeePriceClassification[]>([]);
    const [feeTrendPoints, setFeeTrendPoints] = useState<FeeTrendPoint[]>([]);
    const [feeOutliers, setFeeOutliers] = useState<FeeOutlier[]>([]);
    const [patterns, setTransactionPatterns] = useState<DetectedFeePattern[]>([]);
    const [windowSnapshot, setWindowWindowSnapshot] = useState<WindowSnapshot>({
      avgFeePerVByte: 0,
      medianFeePerVByte: 0,
      transactionsCount: 0,
      outliersCount: 0
    });

    const updateTransactions = (transactionEvent: AnalyzedTransactionEvent) => {
        setWindowWindowSnapshot(prevState => {
            if (transactionEvent) return transactionEvent.windowSnapshot
            else return prevState
        })
        setFeeTrendPoints(prev => {
            const feeTrendPoint: FeeTrendPoint = {
                feePerVByte: transactionEvent.feePerVByte,
                txSize: transactionEvent.txSize,
                timestamp: transactionEvent.timestamp,
            };
            return updateFeeTrendPointsList(prev, feeTrendPoint, MAX_RETENTION_ITEMS);
        });
        setFeeOutliers(prev => {
            if (transactionEvent.isOutlier) {
                const newFeeOutlier: FeeOutlier = {id: transactionEvent.id, feePerByte: transactionEvent.feePerVByte, txSize: transactionEvent.txSize}
                return updateFeeOutliersList(prev, newFeeOutlier, MAX_RETENTION_ITEMS);
            }
            return prev
        });
        setTransactionPatterns(prev => {
            if (transactionEvent.patternSignal) {
                const newPattern: DetectedFeePattern = {
                    id: transactionEvent.id,
                    feePerVByte: transactionEvent.feePerVByte,
                    patternType: transactionEvent.patternSignal.type,
                    metrics: Object.entries(transactionEvent.patternSignal.metrics) as [PatternMetric, number][],
                    timestamp: transactionEvent.timestamp
                };
                return updatePatternsList(prev, newPattern, MAX_RETENTION_TX_LIST_ITEMS).reverse();
            }
            return prev;
        })
        setTransactionListItems(prev => {
            return updateTransactionListItem(prev, transactionEvent, MAX_RETENTION_TX_LIST_ITEMS);
        });
    };

    return (
        <div className="app">
            <div className="app__container">
                <Header isConnected={isConnected}/>
                <SseConnector
                  onEvent={updateTransactions}
                  onOpen={() => setIsConnected(true)}
                  onError={() => setIsConnected(false)}
                />
                <WindowSnapshotCards windowSnapshot={windowSnapshot} />
                <ChartsGrid feeTrendPoints={feeTrendPoints} outliers={feeOutliers}/>
                <ListsGrid feePriceClassifications={transactionListItems} detectedFeePatterns={patterns}/>
            </div>
        </div>
    );
}; 

export default BlockchainFeeAnalyzer;
