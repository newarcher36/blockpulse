import {FeeOutlier, FeePriceClassification, FeeTrendPoint, DetectedFeePattern, WindowSnapshot} from "./models";
import React from "react";

interface HeaderProps {
    isConnected: boolean
}

interface WindowSnapshotCardProps {
    title: string;
    value: number | string;
    unit?: string;
    icon: React.ElementType;
    colorClass: string;
}

interface WindowSnapshotCardsProps {
    windowSnapshot: WindowSnapshot;
}

interface ChartsGridProps {
    feeTrendPoints: FeeTrendPoint[];
    outliers: FeeOutlier[];
}

interface OutliersChartProps {
    outliers: FeeOutlier[];
}

interface FeePriceClassificationListProps {
    feePriceClassificationListProps: FeePriceClassification[];
}

interface FeeTrendPointProps {
    feeTrendPoints: FeeTrendPoint[]
}

interface FeePriceClassificationItemProps {
    feePriceClassification: FeePriceClassification;
}

interface DetectedFeePatternItemProps {
    detectedFeePattern: DetectedFeePattern;
}

interface ListsGridProps{
    feePriceClassifications: FeePriceClassification[];
    detectedFeePatterns: DetectedFeePattern[];
}

interface DetectedFeePatternsListProps {
    detectedFeePattern: DetectedFeePattern[]
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: {
        payload: FeeOutlier;
    }[];
}

export type {
    ChartsGridProps,
    OutliersChartProps,
    CustomTooltipProps,
    WindowSnapshotCardProps,
    WindowSnapshotCardsProps,
    FeePriceClassificationListProps,
    HeaderProps,
    DetectedFeePatternsListProps,
    ListsGridProps,
    FeeTrendPointProps,
    FeePriceClassificationItemProps,
    DetectedFeePatternItemProps,
};
