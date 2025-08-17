import {OutlierChartData, OutlierTransaction, Pattern, Transaction, WindowSnapshot} from "./models";
import React from "react";

interface HeaderProps {
    isConnected: boolean
    connectionStatus: string
}

interface StatCardProps {
    title: string;
    value: number | string;
    unit?: string;
    icon: React.ElementType;
    colorClass: string;
}

interface StatsCardsProps {
    stats: WindowSnapshot;
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

interface UseSSEProps {
    url: string;
    onMessage: (data: Transaction) => void;
    // optional knobs
    retryBaseMs?: number;   // starting backoff
    retryMaxMs?: number;    // max backoff
    maxRetries?: number;    // <=0 means infinite
};

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
    UseSSEProps
};