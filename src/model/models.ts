import {FeeClassification, PatternType} from "./enums"

interface Transaction {
    readonly id: string
    readonly feePerVByte: number
    readonly totalFee: number
    readonly size: number
    readonly timestamp: number
    readonly patternTypes: Set<PatternType>
    readonly feeClassification: FeeClassification
    readonly isOutlier: boolean
    readonly windowStats: WindowStats
}

interface OutlierTransaction {
    readonly id: string
    readonly feePerVByte: number
    readonly size: number
}

interface WindowStats {
    avgFeePerByte: number;
    medianFeePerByte: number;
    totalTransactions: number;
    outliersCount: number;
}

interface OutlierChartData {
    index: number;
    feePerByte: number;
    size: number;
    id: string;
}

interface Pattern {
    type: PatternType;
    metric: string;
    timestamp: number;
}

export type {
    Transaction,
    OutlierChartData,
    OutlierTransaction,
    WindowStats,
    Pattern
};