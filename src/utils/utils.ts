import {OutlierTransaction, Pattern, Transaction, TransactionListItem} from '../model/models';

export const updateTransactionsList = (
    currentTransactions: Transaction[],
    newTransaction: Transaction,
    maxRetentionItems: number
): Transaction[] => {
    return [...currentTransactions, newTransaction].slice(maxRetentionItems);
};

export const updateTransactionListItem = (
    currentTransactions: TransactionListItem[],
    newTransaction: TransactionListItem,
    maxRetentionItems: number
): TransactionListItem[] => {
    return [...currentTransactions, newTransaction].slice(maxRetentionItems);
};

export const updateOutliersList = (
    outlierTransactions: OutlierTransaction[],
    outlierTransaction: OutlierTransaction,
    maxRetentionItems: number
): OutlierTransaction[] => {
    return [...outlierTransactions, outlierTransaction].slice(maxRetentionItems);
};

export const updatePatternsList = (
    patterns: Pattern[],
    newPatterns: Pattern[],
    maxRetentionItems: number
): Pattern[] => {
    return [...patterns, ...newPatterns].slice(maxRetentionItems);
};