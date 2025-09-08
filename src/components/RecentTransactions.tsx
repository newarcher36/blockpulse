import '../styles/RecentTransactions.css';
import React from "react";
import {RecentTransactionProps, TransactionListItemProps} from "../model/props";
import {PriceTier} from "../model/enums";

const TransactionItem: React.FC<TransactionListItemProps> = ({transactionListItem}) => {
    const feePriceTierColorMap: Record<PriceTier, string> = {
        [PriceTier.EXPENSIVE]: 'transaction-item__fee--high',
        [PriceTier.NORMAL]: 'transaction-item__fee--medium',
        [PriceTier.CHEAP]: 'transaction-item__fee--low',
        [PriceTier.OUTSIDE_MARKET]: 'transaction-item__fee--low',
    };

    return (
        <div className="transaction-item">
            <div className="transaction-item__info">
                <p className="transaction-item__id">
                    {transactionListItem.id.substring(0, 30)}...
                </p>
                <p className="transaction-item__size">
                    {transactionListItem.size} bytes
                </p>
            </div>
            <div className="transaction-item__details">
                <p className={`transaction-item__fee ${feePriceTierColorMap[transactionListItem.feeClassification] || ''}`}>
                    {transactionListItem.feePerVByte.toFixed(2)} sat/byte
                </p>
                <p className="transaction-item__timestamp">
                    {new Date(transactionListItem.timestamp).toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
};

const RecentTransactions: React.FC<RecentTransactionProps> = ({transactionListItems}) => {
    return (
        <div className="recent-transactions">
            <h3 className="recent-transactions__title">Recent Transactions</h3>
            <div className="recent-transactions__content">
                {transactionListItems.length === 0 ? (
                    <p className="recent-transactions__empty">No transactions yet...</p>
                ) : (
                    <div className="recent-transactions__list">
                        {transactionListItems.map((transactionListItem) => (
                            <TransactionItem
                                key={transactionListItem.id}
                                transactionListItem={transactionListItem}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;