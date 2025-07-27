import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Charts.css';

const FeeChart = ({ transactions }) => {
  const chartData = transactions.slice(-50).map((tx, index) => ({
    index,
    feePerByte: tx.feePerByte,
    size: tx.size,
    timestamp: new Date(tx.timestamp).toLocaleTimeString()
  }));

  return (
    <div className="chart-container">
      <h3 className="chart-container__title">Fee Per Byte Trend</h3>
      <div className="chart-container__content">
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

export default FeeChart;