import { useCallback } from 'react';

export const useTransactionAnalysis = ({ 
  onOutliersUpdate, 
  onPatternsUpdate, 
  onStatsUpdate 
}) => {
  
  const analyzeTransactions = useCallback((transactions) => {
    if (transactions.length < 10) return;

    // Calculate statistics
    const feePerByteValues = transactions
      .map(tx => tx.feePerByte)
      .sort((a, b) => a - b);
    
    const avg = feePerByteValues.reduce((sum, val) => sum + val, 0) / feePerByteValues.length;
    const median = feePerByteValues[Math.floor(feePerByteValues.length / 2)];
    
    // Detect outliers using IQR method
    const q1 = feePerByteValues[Math.floor(feePerByteValues.length * 0.25)];
    const q3 = feePerByteValues[Math.floor(feePerByteValues.length * 0.75)];
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    const detectedOutliers = transactions
      .filter(tx => tx.feePerByte < lowerBound || tx.feePerByte > upperBound)
      .slice(-20);

    onOutliersUpdate(detectedOutliers);

    // Pattern detection
    const patterns = detectPatterns(transactions, avg);
    onPatternsUpdate(prev => [...prev.slice(-9), ...patterns].slice(-10));

    // Update statistics
    onStatsUpdate({
      avgFeePerByte: avg,
      medianFeePerByte: median,
      totalTransactions: transactions.length,
      outliersCount: detectedOutliers.length
    });
  }, [onOutliersUpdate, onPatternsUpdate, onStatsUpdate]);

  const detectPatterns = (transactions, avgFeePerByte) => {
    const recent = transactions.slice(-50);
    const patterns = [];

    if (recent.length < 20) return patterns;

    // Pattern 1: Sudden fee surge
    const recentWindow = recent.slice(-10);
    const previousWindow = recent.slice(-20, -10);
    
    if (recentWindow.length >= 10 && previousWindow.length >= 10) {
      const recentAvg = recentWindow.reduce((sum, tx) => sum + tx.feePerByte, 0) / 10;
      const previousAvg = previousWindow.reduce((sum, tx) => sum + tx.feePerByte, 0) / 10;
      
      if (recentAvg > previousAvg * 2) {
        patterns.push({
          type: 'FEE_SURGE',
          message: `Fee surge detected: ${recentAvg.toFixed(2)} vs ${previousAvg.toFixed(2)} sat/byte`,
          timestamp: Date.now(),
          severity: 'high'
        });
      }
    }

    // Pattern 2: Fee war detection (high variance)
    const recentFees = recent.map(tx => tx.feePerByte);
    const variance = calculateVariance(recentFees, avgFeePerByte);
    
    if (variance > avgFeePerByte * 0.5) {
      patterns.push({
        type: 'FEE_WAR',
        message: `Fee war detected: High variance (${variance.toFixed(2)})`,
        timestamp: Date.now(),
        severity: 'medium'
      });
    }

    // Pattern 3: Block congestion with low fees
    const avgBlockSize = recent.reduce((sum, tx) => sum + tx.size, 0) / recent.length;
    if (avgBlockSize > 800000 && avgFeePerByte < 10) {
      patterns.push({
        type: 'BLOCK_FULL_LOW_FEE',
        message: `Block congestion with low fees: ${avgFeePerByte.toFixed(2)} sat/byte`,
        timestamp: Date.now(),
        severity: 'medium'
      });
    }

    return patterns;
  };

  const calculateVariance = (values, mean) => {
    return values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length;
  };

  return { analyzeTransactions };
};