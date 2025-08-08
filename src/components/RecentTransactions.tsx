import '../styles/RecentTransactions.css';
import {RecentTransactionsProps, TransactionItemProps} from "../model/models";

const TransactionItem: React.FC<TransactionItemProps> = ({transaction}) => {
    const getFeeColorClass = (feeRate: number): string => {
        // if (feeRate > avgFeePerByte * 2) return 'transaction-item__fee--high';
        // if (feeRate > avgFeePerByte) return 'transaction-item__fee--medium';
        return 'transaction-item__fee--low';
    };

    return (
        <div className="transaction-item">
            <div className="transaction-item__info">
                <p className="transaction-item__id">
                    {transaction.hash}
                </p>
                <p className="transaction-item__size">
                    {transaction.size} bytes
                </p>
            </div>
            <div className="transaction-item__details">
                <p className={`transaction-item__fee ${getFeeColorClass(transaction.feePerVByte)}`}>
                    {transaction.feePerVByte.toFixed(2)} sat/byte
                </p>
                <p className="transaction-item__timestamp">
                    {new Date(transaction.timestamp).toLocaleTimeString()}
                </p>
            </div>
        </div>
    );
};

const RecentTransactions: React.FC<RecentTransactionsProps> = ({transactions}) => {
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