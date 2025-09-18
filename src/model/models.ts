import {PatternMetric, PatternType, PriceTier} from "./enums"

interface AnalyzedTransactionEvent {
    readonly id: string
    readonly feePerVByte: number
    readonly totalFee: number
    readonly txSize: number
    readonly timestamp: number
    readonly patternSignal: PatternSignal
    readonly priceTier: PriceTier
    readonly isOutlier: boolean
    readonly windowSnapshot: WindowSnapshot
}

interface FeePriceClassification {
    readonly id: string
    readonly feePerVByte: number
    readonly txSize: number
    readonly timestamp: number
    readonly priceTier: PriceTier
}

interface FeeOutlier {
    readonly id: string;
    readonly feePerByte: number;
    readonly txSize: number;
}

interface WindowSnapshot {
    readonly avgFeePerVByte: number;
    readonly medianFeePerVByte: number;
    readonly transactionsCount: number;
    readonly outliersCount: number;
}

interface FeeTrendPoint {
    readonly feePerVByte: number;
    readonly txSize: number;
    readonly timestamp: number;
}

interface DetectedFeePattern {
    readonly id: string
    readonly feePerVByte: number
    readonly patternType: PatternType;
    readonly metrics: [PatternMetric, number][];
    readonly timestamp: number;
}

interface PatternSignal {
    readonly type: PatternType;
    readonly metrics: Map<PatternMetric, number>;
}

export type {
    AnalyzedTransactionEvent,
    FeePriceClassification,
    FeeOutlier,
    WindowSnapshot,
    DetectedFeePattern,
    PatternSignal,
    FeeTrendPoint
};
