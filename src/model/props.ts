import {OutlierChartData, OutlierTransaction, Pattern, Transaction, WindowStats} from "./models";
import React from "react";

interface HeaderProps {
    isConnected: boolean
    connectionStatus: string
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

interface ChartsGridProps {
    transactions: Transaction[];
    outliers: OutlierTransaction[];
}

interface OutliersChartProps {
    outliers: OutlierTransaction[];
}

interface TransactionProps {
    transactions: Transaction[];
}

interface ListsGridProps{
    transactions: Transaction[];
    patterns: Pattern[];
}

interface TransactionItemProps {
    transaction: Transaction;
}

interface PatternsProps {
    patterns: Pattern[]
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: {
        payload: OutlierChartData;
    }[];
}

interface UseWebSocketProps {
    url: string;
    onMessage: (data: any) => void;
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
    PatternsProps,
    ListsGridProps,
    UseWebSocketProps
};