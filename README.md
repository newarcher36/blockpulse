# Fee Market Comparator

A real-time React application for analyzing blockchain transaction fees with WebSocket integration to Spring Boot backend.

## Features

- **Real-time fee analysis** with WebSocket connectivity
- **Outlier detection** using statistical methods
- **Pattern recognition** for fee surges, wars, and block congestion
- **Interactive charts** and visual dashboards
- **Docker containerization** for easy deployment

## Quick Start

### Development Mode

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The app will run on `http://localhost:3000` and will generate mock data for testing.

### Production with Docker

1. Build and run with Docker Compose:
```bash
docker-compose up -d
```

2. Or build and run the Docker image directly:
```bash
docker build -t fee-market-comparator .
docker run -p 3000:80 fee-market-comparator
```

## Spring Boot Integration

The app expects WebSocket messages at `ws://localhost:8080/ws/fee-market` with the following format:

```json
{
  "type": "TRANSACTION_UPDATE",
  "transactions": [{
    "id": "tx_123",
    "feePerByte": 25.5,
    "size": 250,
    "timestamp": 1640995200000,
    "blockHeight": 800000,
    "confirmationTime": 600
  }]
}
```

## Available Scripts

- `npm start` - Development server
- `npm build` - Production build
- `npm test` - Run tests
- `docker-compose up` - Run with Docker
