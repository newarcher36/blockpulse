import React from 'react';
import FeeTrendPointChart from './FeeTrendPointChart';
import OutliersChart from './OutliersChart';
import { ChartsGridProps } from '../model/props';


const ChartsGrid: React.FC<ChartsGridProps> = ({feeTrendPoints, outliers}) => {
    return (
    <div className="grid">
      <FeeTrendPointChart feeTrendPoints={feeTrendPoints} />
      <OutliersChart outliers={outliers} />
    </div>
  );
};

export default ChartsGrid;