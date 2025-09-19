import React from 'react';
import {Info} from 'lucide-react';
import '../styles/DetectedFeePatterns.css';
import {DetectedFeePatternItemProps, DetectedFeePatternsListProps} from "../model/props";
import {PatternMetric} from "../model/enums";

const formatMetricLabel = (metric: PatternMetric): string => {
    switch (metric) {
        case PatternMetric.UPPER_TUKEY_FENCE:
            return 'Fee upper threshold crossed';
        case PatternMetric.LOWER_TUKEY_FENCE:
            return 'Fee lower threshold crossed';
        case PatternMetric.MEMPOOL_SIZE:
            return 'Mempool congested with size';
        case PatternMetric.MEMPOOL_RECOMMENDED_FEE_PER_VBYTE:
            return 'Fee higher than network recommended price';
        default:
            return String(metric).replaceAll('_', ' ').toLowerCase();
    }
};

const formatMetricValue = (metric: PatternMetric, value: number): string => {
    const numberFmt = new Intl.NumberFormat(undefined);
    switch (metric) {
        case PatternMetric.MEMPOOL_SIZE:
            return `${numberFmt.format(value)} bytes`;
        case PatternMetric.MEMPOOL_RECOMMENDED_FEE_PER_VBYTE:
        case PatternMetric.UPPER_TUKEY_FENCE:
        case PatternMetric.LOWER_TUKEY_FENCE:
            return `${value.toFixed(2)} sat/byte`;
        default:
            return `${value}`;
    }
};

const DetectedFeePatternItem: React.FC<DetectedFeePatternItemProps> = ({detectedFeePattern}) => {
    return (
        <div className={`pattern-item pattern-item--medium`}>
            <div className="pattern-item__info">
                <p className="pattern-item__id">id: {detectedFeePattern.id.substring(0, 30)}...</p>
                <div className="pattern-item__metrics">
                    {detectedFeePattern.metrics.slice(0, 2).map(([metric, value], idx) => {
                        return (
                            <span key={idx} className="pattern-item__metric-badge">
                                <span className="pattern-item__metric-label">{formatMetricLabel(metric)}:</span>
                                <span className="pattern-item__metric-value"> {formatMetricValue(metric, value)}</span>
                            </span>
                        );
                    })}
                    {detectedFeePattern.metrics.length > 2 && (
                        <span
                            className="pattern-item__metrics-more">+{detectedFeePattern.metrics.length - 2} more</span>
                    )}
                </div>
            </div>
            <div className="pattern-item__type">
                <span className={`pattern-item__type-label pattern-item__type--accent`}>
                    {detectedFeePattern.patternType}
                </span>
            </div>
            <div className="pattern-item__details">
                <p className="pattern-item__fee">{detectedFeePattern.feePerVByte.toFixed(2)} sat/byte</p>
                <p className="pattern-item__timestamp">{new Date(detectedFeePattern.timestamp).toLocaleTimeString()}</p>
            </div>
        </div>
    );
};

const DetectedFeePatternsList: React.FC<DetectedFeePatternsListProps> = ({detectedFeePattern}) => {
    return (
        <div className="pattern-detection">
            <h3 className="pattern-detection__title">
                Fee Intelligence: Discover high‑level patterns and drivers
                <span
                    className="title-info__icon title-info__icon--multiline"
                    data-tooltip={
                        'Spots fee patterns as they happen.\n' +
                        '• SURGE: quick spikes where fees jump for a short time.\n' +
                        '• SCAM: unusually low-fee activity that is unlikely to confirm soon.'
                    }
                >
          <Info/>
        </span>
            </h3>
            <div className="pattern-detection__content">
                {detectedFeePattern.length === 0 ? (
                    <p className="pattern-detection__empty">No patterns detected yet...</p>
                ) : (
                    <div className="pattern-detection__list">
                        {detectedFeePattern.map((pattern, index) => (
                            <DetectedFeePatternItem key={index} detectedFeePattern={pattern}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetectedFeePatternsList;
