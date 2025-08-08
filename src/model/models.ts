interface Transaction {
    readonly id: string
    readonly feePerVByte: number
    readonly totalFee: number
    readonly size: number
    readonly timestamp: number
    readonly insights: Set<InsightType>
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

export enum FeeClassification {
    CHEAP, NORMAL, EXPENSIVE
}

export enum InsightType {
    SURGE, FEE_WAR
}

export type {
    Transaction,
    OutlierChartData,
    OutlierTransaction,
    WindowStats,
};