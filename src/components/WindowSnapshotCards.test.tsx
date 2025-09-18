import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import WindowSnapshotCards from './WindowSnapshotCards';

describe('WindowSnapshotCards', () => {
    const windowSnapshot = {
        avgFeePerVByte: 12.3456,
        medianFeePerVByte: 8.9,
        transactionsCount: 1234,
        outliersCount: 5,
    };

    test('renders four snapshot cards with correct titles', () => {
        render(<WindowSnapshotCards windowSnapshot={windowSnapshot} />);

        // Titles
        expect(screen.getByText('Avg Fee/Virtual Byte')).toBeInTheDocument();
        expect(screen.getByText('Median Fee/Virtual Byte')).toBeInTheDocument();
        expect(screen.getByText('Total Transactions')).toBeInTheDocument();
        expect(screen.getByText('Outliers')).toBeInTheDocument();
    });

    test('renders values and units correctly', () => {
        render(<WindowSnapshotCards windowSnapshot={windowSnapshot} />);

        // Blue (Avg)
        const blueCard = screen.getByTestId('card-blue');
        expect(within(blueCard).getByTestId('value-blue')).toHaveTextContent(String(windowSnapshot.avgFeePerVByte));
        expect(within(blueCard).getByTestId('unit-blue')).toHaveTextContent('sat/vbyte');

        // Green (Median with toFixed(2))
        const greenCard = screen.getByTestId('card-green');
        expect(within(greenCard).getByTestId('value-green')).toHaveTextContent(windowSnapshot.medianFeePerVByte.toFixed(2));
        expect(within(greenCard).getByTestId('unit-green')).toHaveTextContent('sat/vbyte');

        // Cyan (Total Transactions)
        const cyanCard = screen.getByTestId('card-cyan');
        expect(within(cyanCard).getByTestId('value-cyan')).toHaveTextContent(String(windowSnapshot.transactionsCount));
        expect(within(cyanCard).getByTestId('unit-cyan')).toHaveTextContent('analyzed');

        // Red (Outliers)
        const redCard = screen.getByTestId('card-red');
        expect(within(redCard).getByTestId('value-red')).toHaveTextContent(String(windowSnapshot.outliersCount));
        expect(within(redCard).getByTestId('unit-red')).toHaveTextContent('detected');
    });

    test('renders an icon for each card', () => {
        render(<WindowSnapshotCards windowSnapshot={windowSnapshot} />);
        expect(screen.getByTestId('icon-blue')).toBeInTheDocument();
        expect(screen.getByTestId('icon-green')).toBeInTheDocument();
        expect(screen.getByTestId('icon-cyan')).toBeInTheDocument();
        expect(screen.getByTestId('icon-red')).toBeInTheDocument();
    });

    test('renders exactly four cards', () => {
        render(<WindowSnapshotCards windowSnapshot={windowSnapshot} />);
        const cards = [
            screen.getByTestId('card-blue'),
            screen.getByTestId('card-green'),
            screen.getByTestId('card-cyan'),
            screen.getByTestId('card-red'),
        ];
        expect(cards.length).toBe(4);
    });
});