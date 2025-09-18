import {
    AnalyzedTransactionEvent,
    FeeOutlier,
    FeePriceClassification,
    DetectedFeePattern,
    FeeTrendPoint
} from '../model/models';

const appendWithRetention = <T>(
  currentItems: T[],
  newItems: T,
  maxRetentionItems: number
): T[] => {
    return [...currentItems, newItems].slice(-maxRetentionItems);
};

export const updateTransactionsList = (
  currentAnalyzedTransactionEvents: AnalyzedTransactionEvent[],
  newAnalyzedTransactionEvent: AnalyzedTransactionEvent,
  maxRetentionItems: number
): AnalyzedTransactionEvent[] => appendWithRetention(currentAnalyzedTransactionEvents, newAnalyzedTransactionEvent, maxRetentionItems);

export const updateFeeTrendPointsList = (
  currentFeeTrendPoints: FeeTrendPoint[],
  newFeeTrendPoint: FeeTrendPoint,
  maxRetentionItems: number
): FeeTrendPoint[] => appendWithRetention(currentFeeTrendPoints, newFeeTrendPoint, maxRetentionItems);

export const updateTransactionListItem = (
  currentTransactionListItems: FeePriceClassification[],
  newTransactionListItem: FeePriceClassification,
  maxRetentionItems: number
): FeePriceClassification[] => appendWithRetention(currentTransactionListItems, newTransactionListItem, maxRetentionItems);

export const updateFeeOutliersList = (
  currentOutlierTransactions: FeeOutlier[],
  newOutlierTransaction: FeeOutlier,
  maxRetentionItems: number
): FeeOutlier[] => appendWithRetention(currentOutlierTransactions, newOutlierTransaction, maxRetentionItems);

export const updatePatternsList = (
  currentTransactionPatternListItems: DetectedFeePattern[],
  newTransactionPatternListItem: DetectedFeePattern,
  maxRetentionItems: number
): DetectedFeePattern[] => appendWithRetention(currentTransactionPatternListItems, newTransactionPatternListItem, maxRetentionItems);
