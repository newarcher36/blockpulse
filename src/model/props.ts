import {Outlier, OutlierChartData, OutlierTransaction, Transaction, WindowStats} from "./models";
import React from "react";

interface ChartsGridProps {
    transactions: Transaction[];
    outliers: OutlierTransaction[];
}

interface FeeChartProps {
    transactions: Transaction[];
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
    stats: WindowStats;
}

interface OutliersChartProps {
    outliers: Outlier[];
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
    stats: WindowStats;
}

export type {
    ChartsGridProps,
    TransactionItemProps,
    RecentTransactionsProps,
    PatternsGridProps,
    OutliersChartProps,
    CustomTooltipProps,
    StatCardProps,
    StatsCardsProps,
    FeeChartProps,
};