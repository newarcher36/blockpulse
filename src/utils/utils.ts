import {OutlierTransaction, Pattern, Transaction} from '../model/models';

export const updateTransactionsList = (
    currentTransactions: Transaction[],
    newTransaction: Transaction,
    maxRetentionItems: number
): Transaction[] => {
    const updatedTransactions = [...currentTransactions, newTransaction];

    if (updatedTransactions.length > maxRetentionItems) {
        updatedTransactions.shift();
    }

    return updatedTransactions;
};

export const updateOutliersList = (
    outlierTransactions: OutlierTransaction[],
    outlierTransaction: OutlierTransaction,
    maxRetentionItems: number
): OutlierTransaction[] => {
    const updatedOutliers = [...outlierTransactions, outlierTransaction];

    if (updatedOutliers.length > maxRetentionItems) {
        updatedOutliers.shift();
    }

    return updatedOutliers;
};

export const updatePatternsList = (
    patterns: Pattern[],
    pattern: Pattern,
    maxRetentionItems: number
): Pattern[] => {
    const updatedPatterns = [...patterns, pattern];

    if (updatedPatterns.length > maxRetentionItems) {
        updatedPatterns.shift();
    }

    return updatedPatterns;
};