import React from 'react';
import {CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis} from 'recharts';
import '../styles/Charts.css';
import {CustomTooltipProps, OutliersChartProps} from '../model/props';

const OutliersChart: React.FC<OutliersChartProps> = ({outliers}) => {
    const outlierChartData = outliers.map((o, index) => ({
        index,
        id: o.id,
        feePerByte: o.feePerVByte,
        size: o.size,
    }));

    const CustomTooltip: React.FC<CustomTooltipProps> = ({active, payload}) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="chart-tooltip">
                    <p className="chart-tooltip__label">Transaction Outlier</p>
                    <p className="chart-tooltip__value">
                        Fee: {data.feePerByte.toFixed(2)} sat/byte
                    </p>
                    <p className="chart-tooltip__value">
                        Size: {data.size} bytes
                    </p>
                    <p className="chart-tooltip__id">
                        ID: {data.id?.substring(0, 16)}...
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="chart-container">
            <h3 className="chart-container__title">Fee Outliers</h3>
            <div className="chart-container__content">
                <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart data={outlierChartData}>
                        <CartesianGrid strokeDasharray="3 3" className="chart-grid"/>
                        <XAxis
                            dataKey="size"
                            className="chart-axis"
                            fontSize={12}
                            label={{value: 'Transaction Size (bytes)', position: 'insideBottom', offset: -5}}
                        />
                        <YAxis
                            dataKey="feePerByte"
                            className="chart-axis"
                            fontSize={12}
                            label={{value: 'Fee (sat/byte)', angle: -90, position: 'insideLeft'}}
                        />
                        <Tooltip content={<CustomTooltip/>}/>
                        <Scatter
                            dataKey="feePerByte"
                            fill="var(--color-danger)"
                            fillOpacity={0.8}
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OutliersChart;