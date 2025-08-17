import React from 'react';
import {AlertTriangle, Zap, TrendingUp, Activity} from 'lucide-react';
import '../styles/StatsCards.css';
import {StatCardProps, StatsCardsProps} from '../model/props';

const StatCard: React.FC<StatCardProps> = ({title, value, unit, icon: Icon, colorClass}) => (
    <div className="stat-card">
        <div className="stat-card__content">
            <div className="stat-card__text">
                <p className="stat-card__label">{title}</p>
                <p className={`stat-card__value stat-card__value--${colorClass}`}>
                    {value}
                </p>
                {unit && <p className="stat-card__unit">{unit}</p>}
            </div>
            <Icon className={`stat-card__icon stat-card__icon--${colorClass}`}/>
        </div>
    </div>
);

const StatsCards: React.FC<StatsCardsProps> = ({stats}) => {
    stats.transactionsCount = stats.transactionsCount || 0;
    stats.outliersCount = stats.outliersCount || 0;
    stats.avgFeePerVByte = stats.avgFeePerVByte || 0;
    stats.medianFeePerVByte = stats.medianFeePerVByte || 0;

    const statsConfig = [
        {
            title: 'Avg Fee/Virtual Byte',
            value: stats.avgFeePerVByte,
            unit: 'sat/vbyte',
            icon: TrendingUp,
            colorClass: 'blue'
        },
        {
            title: 'Median Fee/Virtual Byte',
            value: stats.medianFeePerVByte.toFixed(2),
            unit: 'sat/vbyte',
            icon: Activity,
            colorClass: 'green'
        },
        {
            title: 'Total Transactions',
            value: stats.transactionsCount,
            unit: 'analyzed',
            icon: Zap,
            colorClass: 'purple'
        },
        {
            title: 'Outliers',
            value: stats.outliersCount,
            unit: 'detected',
            icon: AlertTriangle,
            colorClass: 'red'
        }
    ];

    return (
        <div className="stats-grid">
            {statsConfig.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>
    );
};

export default StatsCards;