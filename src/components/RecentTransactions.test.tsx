import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecentTransactions from './RecentTransactions';
import { Transaction } from '../model/models';
import { FeeClassification } from '../model/enums';

const baseTransaction = {
  totalFee: 0,
  patternTypes: new Set(),
  isOutlier: false,
  windowSnapshot: {
    avgFeePerVByte: 0,
    medianFeePerVByte: 0,
    transactionsCount: 0,
    outliersCount: 0,
  },
} as const;

const createTransaction = (overrides: Partial<Transaction>): Transaction => ({
  id: 'a'.repeat(64),
  feePerVByte: 10,
  size: 250,
  timestamp: 1609459200000, // Jan 1, 2021
  feeClassification: FeeClassification.NORMAL,
  ...baseTransaction,
  ...overrides,
});

describe('RecentTransactions', () => {
  it('renders empty state when there are no transactions', () => {
    render(<RecentTransactions transactions={[]} />);
    expect(screen.getByText('No transactions yet...')).toBeInTheDocument();
  });

  it('renders transaction details correctly', () => {
    const tx = createTransaction({
      feePerVByte: 12.3456,
      feeClassification: FeeClassification.EXPENSIVE,
    });
    render(<RecentTransactions transactions={[tx]} />);

    const displayedId = tx.id.substring(0, 30) + '...';
    expect(screen.getByText(displayedId)).toBeInTheDocument();
    expect(screen.getByText(`${tx.size} bytes`)).toBeInTheDocument();
    const feeText = `${tx.feePerVByte.toFixed(2)} sat/byte`;
    expect(screen.getByText(feeText)).toHaveClass('transaction-item__fee--high');
    const timeText = new Date(tx.timestamp).toLocaleTimeString();
    expect(screen.getByText(timeText)).toBeInTheDocument();
  });

  it('applies correct fee classification classes', () => {
    const txs = [
      createTransaction({ feePerVByte: 1, feeClassification: FeeClassification.CHEAP }),
      createTransaction({ feePerVByte: 2, feeClassification: FeeClassification.NORMAL }),
      createTransaction({ feePerVByte: 3, feeClassification: FeeClassification.EXPENSIVE }),
    ];

    render(<RecentTransactions transactions={txs} />);

    expect(screen.getByText('1.00 sat/byte')).toHaveClass('transaction-item__fee--low');
    expect(screen.getByText('2.00 sat/byte')).toHaveClass('transaction-item__fee--medium');
    expect(screen.getByText('3.00 sat/byte')).toHaveClass('transaction-item__fee--high');
  });
});

