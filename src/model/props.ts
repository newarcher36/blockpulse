import {OutlierChartData, OutlierTransaction, Transaction, WindowStats} from "./models";
import React from "react";

interface ChartsGridProps {
    transactions: Transaction[];
    outliers: OutlierTransaction[];
}

interface TransactionProps {
    transactions: Transaction[];
}

interface TransactionItemProps {
    transaction: Transaction;
}

interface OutliersChartProps {
    outliers: OutlierTransaction[];
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

interface HeaderProps {
    isConnected: boolean
    connectionStatus: string
}

export type {
    ChartsGridProps,
    TransactionItemProps,
    OutliersChartProps,
    CustomTooltipProps,
    StatCardProps,
    StatsCardsProps,
    TransactionProps,
    HeaderProps,
};