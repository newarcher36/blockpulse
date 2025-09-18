import '../styles/FeePriceClassification.css';
import React from "react";
import { Info } from 'lucide-react';
import {FeePriceClassificationListProps, FeePriceClassificationItemProps} from "../model/props";
import {PriceTier} from "../model/enums";

const FeePriceClassificationItem: React.FC<FeePriceClassificationItemProps> = ({feePriceClassification}) => {
    const feePriceTierColorMap: Record<PriceTier, string> = {
        [PriceTier.EXPENSIVE]: 'fee-price-classification-item__fee--high',
        [PriceTier.NORMAL]: 'fee-price-classification-item__fee--medium',
        [PriceTier.CHEAP]: 'fee-price-classification-item__fee--low',
        [PriceTier.ABNORMAL_PRICE]: 'fee-price-classification-item__fee--abnormal',
    };
    return (
        <div className="fee-price-classification-item">
            <div className="fee-price-classification-item__info">
                <p className="fee-price-classification-item__id">
                    id: {feePriceClassification.id.substring(0, 25)}...
                </p>
                <p className="fee-price-classification-item__size">
                    size : {feePriceClassification.txSize} bytes
                </p>
            </div>
            <div className="fee-price-classification-item__tier">
                <span
                    className={`fee-price-classification-item__tier-label ${feePriceTierColorMap[feePriceClassification.priceTier] || ''}`}>
                    {String(feePriceClassification.priceTier).replace('_', ' ').toUpperCase()}
                </span>
            </div>
            <div className="fee-price-classification-item__details">
                <p className="fee-price-classification-item__fee">
                    {feePriceClassification.feePerVByte.toFixed(2)} sat/byte
                </p>
                <p className="fee-price-classification-item__timestamp">
                    {new Date(feePriceClassification.timestamp).toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
};

const FeePriceClassificationList: React.FC<FeePriceClassificationListProps> = ({feePriceClassificationListProps}) => {
    return (
        <div className="fee-price-classification">
            <h3 className="fee-price-classification__title">
                Fee Price Classification: How each transaction’s fee compares to others
                <span
                    className="title-info__icon"
                    data-tooltip={
                        'Every new transaction shows its size, fee rate, and time.\n' +
                        'We label each one as Cheap, Normal, Expensive, or Abnormal so you can quickly gauge how competitive its fee is.'
                    }
                >
                    <Info />
                </span>
            </h3>
            <div className="fee-price-classification__content">
                {feePriceClassificationListProps.length === 0 ? (
                    <p className="fee-price-classification__empty">No transactions yet...</p>
                ) : (
                    <div className="fee-price-classification__list">
                        {feePriceClassificationListProps.map((transactionListItem) => (
                            <FeePriceClassificationItem
                                key={transactionListItem.id}
                                feePriceClassification={transactionListItem}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeePriceClassificationList;
