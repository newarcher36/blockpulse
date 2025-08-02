import React from 'react';
import FeeChart from './FeeChart';
import OutliersChart from './OutliersChart';
import '../styles/ChartsGrid.css';

const ChartsGrid = ({ transactions, outliers }) => {
  return (
    <div className="charts-grid">
      <FeeChart transactions={transactions} />
      <OutliersChart outliers={outliers} />
    </div>
  );
};

export default ChartsGrid;