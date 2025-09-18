import React from 'react';
import ReactDOM from 'react-dom/client';
import {ErrorBoundary} from 'react-error-boundary';
import './styles/index.css';
import App from './App';
import {reportWebVitals} from "./reportWebVitals";

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Failed to find root element");
}

const root: ReactDOM.Root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals(console.log); // This will log the metrics to the console