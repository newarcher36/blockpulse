import React from "react";

interface Transaction {
    readonly id: string;
    readonly feeRate: number;
    readonly size: number;
    readonly hash: string;
    readonly timestamp: number;
}

interface Stats {
    avgFeePerByte: number;
}

interface TransactionItemProps {
    transaction: Transaction;
}

interface RecentTransactionsProps {
    transactions: Transaction[];
}

interface PatternsGridProps {
    patterns: any[];
    transactions: any[];
    stats: {
        avgFeePerByte: number;
        medianFeePerByte: number;
        totalTransactions: number;
        outliersCount: number;
    };
}

interface Outlier {
    id: string;
    feePerByte: number;
    size: number;
}

interface OutliersChartProps {
    outliers: Outlier[];
}

interface OutlierChartData {
    index: number;
    feePerByte: number;
    size: number;
    id: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: {
        payload: OutlierChartData;
    }[];
}

interface StatCardProps {
    title: string;
    value: string | number;
    unit?: string;
    icon: React.ElementType;
    colorClass: string;
}

interface StatsCardsProps {
    stats: {
        avgFeePerByte: number;
        medianFeePerByte: number;
        totalTransactions: number;
        outliersCount: number;
    };
}

export type {
    TransactionItemProps,
    RecentTransactionsProps,
    Transaction,
    PatternsGridProps,
    Stats,
    CustomTooltipProps,
    OutliersChartProps,
    Outlier,
    OutlierChartData,
    StatCardProps,
    StatsCardsProps
};