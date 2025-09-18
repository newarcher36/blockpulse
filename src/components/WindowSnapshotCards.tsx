import React from 'react';
import {AlertTriangle, Zap, TrendingUp, Activity} from 'lucide-react';
import '../styles/WindowSnapshotCards.css';
import {WindowSnapshotCardProps, WindowSnapshotCardsProps} from '../model/props';

const WindowSnapshotCard: React.FC<WindowSnapshotCardProps> = ({title, value, unit, icon: Icon, colorClass}) => (
    <div className="window-snapshot-card" data-testid={`card-${colorClass}`}>
        <div className="window-snapshot-card__content">
            <div className="window-snapshot-card__text">
                <p className="window-snapshot-card__label">{title}</p>
                <p
                  className={`window-snapshot-card__value window-snapshot-card__value--${colorClass}`}
                  data-testid={`value-${colorClass}`}
                >
                    {value}
                </p>
                {unit && (
                  <p className="window-snapshot-card__unit" data-testid={`unit-${colorClass}`}>
                    {unit}
                  </p>
                )}
            </div>
            <Icon
              className={`window-snapshot-card__icon window-snapshot-card__icon--${colorClass}`}
              data-testid={`icon-${colorClass}`}
            />
        </div>
    </div>
);

const WindowSnapshotCards: React.FC<WindowSnapshotCardsProps> = ({windowSnapshot}) => {
    const windowSnapshotConfig = [
        {
            title: 'Avg Fee/Virtual Byte',
            value: windowSnapshot.avgFeePerVByte,
            unit: 'sat/vbyte',
            icon: TrendingUp,
            colorClass: 'blue'
        },
        {
            title: 'Median Fee/Virtual Byte',
            value: windowSnapshot.medianFeePerVByte.toFixed(2),
            unit: 'sat/vbyte',
            icon: Activity,
            colorClass: 'green'
        },
        {
            title: 'Total Transactions',
            value: windowSnapshot.transactionsCount,
            unit: 'analyzed',
            icon: Zap,
            colorClass: 'cyan'
        },
        {
            title: 'Outliers',
            value: windowSnapshot.outliersCount,
            unit: 'detected',
            icon: AlertTriangle,
            colorClass: 'red'
        }
    ];

    return (
        <div className="stats-grid">
            {windowSnapshotConfig.map((stat, index) => (
                <WindowSnapshotCard key={index} {...stat} />
            ))}
        </div>
    );
};

export default WindowSnapshotCards;
