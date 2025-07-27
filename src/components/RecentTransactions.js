import React from 'react';
import '../styles/RecentTransactions.css';

const TransactionItem = ({ transaction, avgFeePerByte }) => {
  const getFeeColorClass = (feePerByte) => {
    if (feePerByte > avgFeePerByte * 2) return 'transaction-item__fee--high';
    if (feePerByte > avgFeePerByte) return 'transaction-item__fee--medium';
    return 'transaction-item__fee--low';
  };

  return (
    <div className="transaction-item">
      <div className="transaction-item__info">
        <p className="transaction-item__id">
          {transaction.id.substring(0, 16)}...
        </p>
        <p className="transaction-item__size">
          {transaction.size} bytes
        </p>
      </div>
      <div className="transaction-item__details">
        <p className={`transaction-item__fee ${getFeeColorClass(transaction.feePerByte)}`}>
          {transaction.feePerByte.toFixed(2)} sat/byte
        </p>
        <p className="transaction-item__timestamp">
          {new Date(transaction.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

const RecentTransactions = ({ transactions, stats }) => {
  const recentTransactions = transactions.slice(-10).reverse();

  return (
    <div className="recent-transactions">
      <h3 className="recent-transactions__title">Recent Transactions</h3>
      <div className="recent-transactions__content">
        {recentTransactions.length === 0 ? (
          <p className="recent-transactions__empty">No transactions yet...</p>
        ) : (
          <div className="recent-transactions__list">
            {recentTransactions.map((transaction) => (
              <TransactionItem 
                key={transaction.id} 
                transaction={transaction}
                avgFeePerByte={stats.avgFeePerByte}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;