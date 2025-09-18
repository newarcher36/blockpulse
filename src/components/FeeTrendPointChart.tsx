import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import { Info } from 'lucide-react';
import '../styles/Charts.css';
import React from "react";
import {FeeTrendPointProps} from "../model/props";

const FeeTrendPointChart: React.FC<FeeTrendPointProps> = ({feeTrendPoints}) => {
  const chartData = feeTrendPoints.map((tx, index) => ({
    index,
    feePerByte: tx.feePerVByte,
    size: tx.txSize,
    timestamp: new Date(tx.timestamp).toLocaleTimeString()
  }));

  return (
    <div className="fee-trend-point-chart">
      <h3 className="fee-trend-point-chart__title">
        Fee Per Byte Trend: Watch how the transaction fees change over time
        <span
          className="title-info__icon"
          data-tooltip={
            'See how transaction fees change over time.\n' +
            'The line tracks recent fee-per-byte so you can tell if fees are cooling down or heating up.'
          }
        >
          <Info />
        </span>
      </h3>
      <div className="fee-trend-point-chart__content">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="chart-grid" />
            <XAxis 
              dataKey="timestamp" 
              className="chart-axis"
              fontSize={12} 
            />
            <YAxis 
              className="chart-axis"
              fontSize={12}
              label={{ value: 'Fee (sat/byte)', angle: -90, position: 'insideLeft', fill: 'var(--color-text-primary)' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-surface-secondary)', 
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
              labelStyle={{ color: 'var(--color-text-primary)' }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="feePerByte" 
              stroke="var(--color-primary)" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeeTrendPointChart;
