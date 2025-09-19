# ₿itcoin Fee Analyzer — UI

Lightweight React dashboard to visualize Bitcoin transaction fees in real time.
It connects to a backend over Server‑Sent Events (SSE) and presents live charts,
stats, and lists to help you quickly understand current fee dynamics.

## Live Demo

- See the app running on AWS: https://d3q8hndklwuv8q.cloudfront.net

### Intended Hosting (S3 + CloudFront)

- Static assets are built with `react-scripts build` and uploaded to an Amazon S3 bucket configured for static website hosting.
- Amazon CloudFront sits in front of S3 to provide global edge caching, HTTPS, and fast delivery.
- Typical setup includes:
  - S3 bucket with public-read access via an Origin Access Control/Identity (no direct public bucket access).
  - CloudFront distribution with the S3 bucket as origin, default root object set to `index.html`.
  - Error responses mapping 403/404 to `index.html` to support client-side routing.
  - Optional cache invalidations after deployments for instant updates.

## Features

- Live connection indicator (connected/disconnected).
- Stats cards: Average fee/vB, Median fee/vB, Total transactions, Outliers.
- Charts:
  - Fee Per Byte Trend: line chart showing how fees evolve over time.
  - Fee Outliers: scatter plot highlighting unusually high/low fee transactions by size vs fee.
- Lists:
  - Fee Price Tier Classification: recent transactions with id, size, fee per vB, and a tier label (Cheap/Normal/Expensive/Abnormal).
  - Fee Pattern Detection: recent patterns (SURGE/SCAM) with key metrics, type label, fee, and time.
- Helpful tooltips on panel titles for quick explanations.

## Data Source

- SSE endpoint: `/api/v1/transactions/stream` (proxied by CRA to `http://localhost:8080`).
- Expected event shape (simplified):
  - `id`, `feePerVByte`, `txSize`, `timestamp`, `priceTier`, `isOutlier`
  - `patternSignal`: `{ type: 'SURGE' | 'SCAM', metrics: Map | object }`
  - `windowSnapshot`: `{ avgFeePerVByte, medianFeePerVByte, transactionsCount, outliersCount }`

## Getting Started

Requirements: Node 18+ and npm.

Install and run in development:

```
npm install
npm start
```

Run tests:

```
npm test
```

Build production bundle:

```
npm run build
```

Docker (optional):

```
docker compose up --build
```

## Customization

- Retention limits: adjust `MAX_RETENTION_ITEMS` and `MAX_RETENTION_TX_LIST_ITEMS` in `src/App.tsx`.
- Colors and theme: edit CSS variables in `src/styles/App.css`.
- Assets: place images under `src/assets/images` and import them in components.

## Project Structure

- `src/components`: UI components (charts, lists, header, stats).
- `src/styles`: CSS files and theme variables.
- `src/model`: TypeScript models and enums.
- `src/utils`: small helpers (e.g., list retention).

## Notes

This repository contains only the UI. It assumes a running backend that
emits SSE events at the configured endpoint. If the stream is unavailable,
the connection indicator shows “disconnected” and charts/lists will remain empty.
