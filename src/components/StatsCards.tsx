import React from 'react';
import { AlertTriangle, Zap, TrendingUp, Activity } from 'lucide-react';
import '../styles/StatsCards.css';

const StatCard = ({ title, value, unit, icon: Icon, colorClass }) => (
  <div className="stat-card">
    <div className="stat-card__content">
      <div className="stat-card__text">
        <p className="stat-card__label">{title}</p>
        <p className={`stat-card__value stat-card__value--${colorClass}`}>
          {value}
        </p>
        {unit && <p className="stat-card__unit">{unit}</p>}
      </div>
      <Icon className={`stat-card__icon stat-card__icon--${colorClass}`} />
    </div>
  </div>
);

const StatsCards = ({ stats }) => {
  const statsConfig = [
    {
      title: 'Avg Fee/Byte',
      value: stats.avgFeePerByte.toFixed(2),
      unit: 'sat/byte',
      icon: TrendingUp,
      colorClass: 'blue'
    },
    {
      title: 'Median Fee/Byte',
      value: stats.medianFeePerByte.toFixed(2),
      unit: 'sat/byte',
      icon: Activity,
      colorClass: 'green'
    },
    {
      title: 'Total Transactions',
      value: stats.totalTransactions,
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