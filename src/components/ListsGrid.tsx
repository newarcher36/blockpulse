import React from 'react';
import DetectedFeePatternsList from './DetectedFeePatternsList';
import FeePriceClassificationList from './FeePriceClassificationList';
import '../styles/SharedGrid.css';
import {ListsGridProps} from "../model/props";

const ListsGrid: React.FC<ListsGridProps> = ({feePriceClassifications, detectedFeePatterns}) => {
    return (
        <div className="grid">
            <DetectedFeePatternsList detectedFeePattern={detectedFeePatterns}/>
            <FeePriceClassificationList feePriceClassificationListProps={feePriceClassifications}/>
        </div>
    );
};

export default ListsGrid;