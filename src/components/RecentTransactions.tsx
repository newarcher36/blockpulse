import '../styles/RecentTransactions.css';
import React from "react";
import {TransactionItemProps, TransactionProps} from "../model/props";
import {FeeClassification} from "../model/enums";

const TransactionItem: React.FC<TransactionItemProps> = ({transaction}) => {
    const feeColorMap: Record<FeeClassification, string> = {
        [FeeClassification.EXPENSIVE]: 'transaction-item__fee--high',
        [FeeClassification.NORMAL]: 'transaction-item__fee--medium',
        [FeeClassification.CHEAP]: 'transaction-item__fee--low',
    };

    return (
        <div className="transaction-item">
            <div className="transaction-item__info">
                <p className="transaction-item__id">
                    {transaction.id}
                </p>
                <p className="transaction-item__size">
                    {transaction.size} bytes
                </p>
            </div>
            <div className="transaction-item__details">
                <p className={`transaction-item__fee ${feeColorMap[transaction.feeClassification] || ''}`}>
                    {transaction.feePerVByte.toFixed(2)} sat/byte
                </p>
                <p className="transaction-item__timestamp">
                    {new Date(transaction.timestamp).toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
};

const RecentTransactions: React.FC<TransactionProps> = ({transactions}) => {
    return (
        <div className="recent-transactions">
            <h3 className="recent-transactions__title">Recent Transactions</h3>
            <div className="recent-transactions__content">
                {transactions.length === 0 ? (
                    <p className="recent-transactions__empty">No transactions yet...</p>
                ) : (
                    <div className="recent-transactions__list">
                        {transactions.map((transaction) => (
                            <TransactionItem
                                key={transaction.id}
                                transaction={transaction}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;