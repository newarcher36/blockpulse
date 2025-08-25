import {Transaction} from "../model/models";
import {updateTransactionsList} from "./utils";


const createMockTransaction = (id: string): Transaction => ({id} as Transaction);

describe('updateTransactionsList', () => {
    const RETENTION_LIMIT = 3;
    describe('adding transactions within limit', () => {
        it('should add a new transaction to an empty array', () => {
            const currentTransactions: Transaction[] = [];
            const newTransaction = createMockTransaction('1');

            const result = updateTransactionsList(currentTransactions, newTransaction, RETENTION_LIMIT);

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(newTransaction);
        });

        it('should add a new transaction to existing transactions', () => {
            const currentTransactions = [
                createMockTransaction('1'),
                createMockTransaction('2')
            ];
            const newTransaction = createMockTransaction('3');

            const result = updateTransactionsList(currentTransactions, newTransaction, RETENTION_LIMIT);

            expect(result).toHaveLength(3);
            expect(result[2]).toEqual(newTransaction);
        });

        it('should maintain transaction order when adding new transaction', () => {
            const transaction1 = createMockTransaction('1');
            const transaction2 = createMockTransaction('2');
            const transaction3 = createMockTransaction('3');
            const currentTransactions = [transaction1, transaction2];

            const result = updateTransactionsList(currentTransactions, transaction3, RETENTION_LIMIT);

            expect(result).toEqual([transaction1, transaction2, transaction3]);
        });
    });

    describe('retention limit behavior', () => {
        it('should remove oldest transaction when exceeding the retention limit', () => {
            const currentTransactions = Array.from({length: 3}, (_, i) =>
                createMockTransaction(`${i + 1}`)
            );
            const newTransaction = createMockTransaction('4');

            const result = updateTransactionsList(currentTransactions, newTransaction, RETENTION_LIMIT);

            expect(result).toHaveLength(3);
            expect(result[0].id).toBe('2');
            expect(result[1].id).toBe('3');
            expect(result[2].id).toBe('4');
        });

        it('should not remove transactions when exactly at limit', () => {
            const currentTransactions = [
                createMockTransaction('1'),
                createMockTransaction('2')
            ];
            const newTransaction = createMockTransaction('3');
            const maxRetentionItems = 3;

            const result = updateTransactionsList(currentTransactions, newTransaction, maxRetentionItems);

            expect(result).toHaveLength(3);
            expect(result.map(t => t.id)).toEqual(['1', '2', '3']);
        });
    });
});