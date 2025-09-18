import {
    AnalyzedTransactionEvent,
    FeeOutlier,
    FeePriceClassification,
    DetectedFeePattern
} from "../model/models";
import {updateFeeOutliersList, updatePatternsList, updateTransactionListItem, updateTransactionsList} from "./utils";

const RETENTION_LIMIT = 3;
const createMockTransaction = (id: string): AnalyzedTransactionEvent => createMock(id);
const createMockTransactionListItem = (id: string): FeePriceClassification => createMock(id);
const createMockOutlier = (id: string): FeeOutlier => createMock(id);
const createPattern = (id: string): DetectedFeePattern => createMock(id);
const createMock = <T>(id: string): T => ({id} as T);

describe('updateTransactionsList', () => {
    describe('adding transactions within limit', () => {
        it('should add a new transaction to an empty array', () => {
            const current: AnalyzedTransactionEvent[] = [];
            const newTransaction = createMockTransaction('1');
            const result = updateTransactionsList(current, newTransaction, RETENTION_LIMIT);
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(newTransaction);
        });

        it('should add a new transaction to existing transactions', () => {
            const current = [createMockTransaction('1'), createMockTransaction('2')];
            const newTransaction = createMockTransaction('3');
            const result = updateTransactionsList(current, newTransaction, RETENTION_LIMIT);
            expect(result).toHaveLength(3);
            expect(result[2]).toEqual(newTransaction);
        });

        it('should maintain transaction order when adding new transaction', () => {
            const t1 = createMockTransaction('1');
            const t2 = createMockTransaction('2');
            const t3 = createMockTransaction('3');
            const result = updateTransactionsList([t1, t2], t3, RETENTION_LIMIT);
            expect(result).toEqual([t1, t2, t3]);
        });
    });

    describe('retention limit behavior', () => {
        it('should remove oldest transaction when exceeding the retention limit', () => {
            const current = [createMockTransaction('1'), createMockTransaction('2'), createMockTransaction('3')];
            const newTransaction = createMockTransaction('4');
            const result = updateTransactionsList(current, newTransaction, RETENTION_LIMIT);
            expect(result.map((t: any) => t.id)).toEqual(['2', '3', '4']);
        });

        it('should not remove transactions when exactly at limit', () => {
            const current = [createMockTransaction('1'), createMockTransaction('2')];
            const newTransaction = createMockTransaction('3');
            const result = updateTransactionsList(current, newTransaction, RETENTION_LIMIT);
            expect(result.map((t: any) => t.id)).toEqual(['1', '2', '3']);
        });
    });
});

describe('updateTransactionListItem', () => {
    describe('adding transactions within limit', () => {
        it('should add a new item to an empty array', () => {
            const current: FeePriceClassification[] = [];
            const newItem = createMockTransactionListItem('1');
            const result = updateTransactionListItem(current, newItem, RETENTION_LIMIT);
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(newItem);
        });

        it('should add a new item to existing items', () => {
            const current = [createMockTransactionListItem('1'), createMockTransactionListItem('2')];
            const newItem = createMockTransactionListItem('3');
            const result = updateTransactionListItem(current, newItem, RETENTION_LIMIT);
            expect(result).toHaveLength(3);
            expect(result[2]).toEqual(newItem);
        });

        it('should maintain order when adding new item', () => {
            const i1 = createMockTransactionListItem('1');
            const i2 = createMockTransactionListItem('2');
            const i3 = createMockTransactionListItem('3');
            const result = updateTransactionListItem([i1, i2], i3, RETENTION_LIMIT);
            expect(result).toEqual([i1, i2, i3]);
        });
    });

    describe('retention limit behavior', () => {
        it('should remove oldest item when exceeding the retention limit', () => {
            const current = [createMockTransactionListItem('1'), createMockTransactionListItem('2'), createMockTransactionListItem('3')];
            const newItem = createMockTransactionListItem('4');
            const result = updateTransactionListItem(current, newItem, RETENTION_LIMIT);
            expect(result.map((t) => t.id)).toEqual(['2', '3', '4']);
        });

        it('should not remove items when exactly at limit', () => {
            const current = [createMockTransactionListItem('1'), createMockTransactionListItem('2')];
            const newItem = createMockTransactionListItem('3');
            const result = updateTransactionListItem(current, newItem, RETENTION_LIMIT);
            expect(result.map((t) => t.id)).toEqual(['1', '2', '3']);
        });
    });
});

describe('updateOutliersList', () => {
    describe('adding outliers within limit', () => {
        it('should add a new outlier to an empty array', () => {
            const current: FeeOutlier[] = [];
            const newOutlier = createMockOutlier('1');
            const result = updateFeeOutliersList(current, newOutlier, RETENTION_LIMIT);
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual(newOutlier);
        });

        it('should add a new outlier to existing outliers', () => {
            const current = [createMockOutlier('1'), createMockOutlier('2')];
            const newOutlier = createMockOutlier('3');
            const result = updateFeeOutliersList(current, newOutlier, RETENTION_LIMIT);
            expect(result).toHaveLength(3);
            expect(result[2]).toEqual(newOutlier);
        });

        it('should maintain order when adding new outlier', () => {
            const o1 = createMockOutlier('1');
            const o2 = createMockOutlier('2');
            const o3 = createMockOutlier('3');
            const result = updateFeeOutliersList([o1, o2], o3, RETENTION_LIMIT);
            expect(result).toEqual([o1, o2, o3]);
        });
    });

    describe('retention limit behavior', () => {
        it('should remove oldest outlier when exceeding the retention limit', () => {
            const current = [createMockOutlier('1'), createMockOutlier('2'), createMockOutlier('3')];
            const newOutlier = createMockOutlier('4');
            const result = updateFeeOutliersList(current, newOutlier, RETENTION_LIMIT);
            expect(result.map((o) => o.id)).toEqual(['2', '3', '4']);
        });

        it('should not remove outliers when exactly at limit', () => {
            const current = [createMockOutlier('1'), createMockOutlier('2')];
            const newOutlier = createMockOutlier('3');
            const result = updateFeeOutliersList(current, newOutlier, RETENTION_LIMIT);
            expect(result.map((o) => o.id)).toEqual(['1', '2', '3']);
        });
    });
});

describe('updatePatternsList', () => {
    describe('adding patterns within limit', () => {
        it('should add a new pattern to an empty array', () => {
            const current: DetectedFeePattern[] = [];
            const added: DetectedFeePattern = createPattern('p1');
            const result: DetectedFeePattern[] = updatePatternsList(current, added, RETENTION_LIMIT);
            expect(result.map((x) => x.id)).toEqual(['p1']);
        });

        it('should add a new pattern to existing patterns', () => {
            const current: DetectedFeePattern[] = [createPattern('p1')];
            const added: DetectedFeePattern = createPattern('p2');
            const result: DetectedFeePattern[] = updatePatternsList(current, added, RETENTION_LIMIT);
            expect(result.map((x) => x.id)).toEqual(['p1', 'p2']);
        });

        it('should maintain order when adding new pattern', () => {
            const current: DetectedFeePattern[] = [createPattern('p1'), createPattern('p2')];
            const added: DetectedFeePattern = createPattern('p3');
            const result: DetectedFeePattern[] = updatePatternsList(current, added, RETENTION_LIMIT);
            expect(result.map((x) => x.id)).toEqual(['p1', 'p2', 'p3']);
        });
    });

    describe('retention limit behavior', () => {
        it('should remove oldest pattern when exceeding the retention limit', () => {
            const current: DetectedFeePattern[] = [createPattern('p1'), createPattern('p2'), createPattern('p3')];
            const added: DetectedFeePattern= createPattern('p4');
            const result: DetectedFeePattern[] = updatePatternsList(current, added, RETENTION_LIMIT);
            expect(result.map((x) => x.id)).toEqual(['p2', 'p3', 'p4']);
        });

        it('should not remove patterns when exactly at limit', () => {
            const current: DetectedFeePattern[] = [createPattern('p1'), createPattern('p2')];
            const added: DetectedFeePattern = createPattern('p3');
            const result: DetectedFeePattern[] = updatePatternsList(current, added, RETENTION_LIMIT);
            expect(result.map((x) => x.id)).toEqual(['p1', 'p2', 'p3']);
        });
    });
});