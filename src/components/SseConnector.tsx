import React, { useEffect, useRef } from 'react';
import { AnalyzedTransactionEvent } from '../model/models';

interface SseConnectorProps {
  onEvent: (event: AnalyzedTransactionEvent) => void;
  onOpen: () => void;
  onError: () => void;
  retry?: boolean;
  maxRetries?: number;
  retryDelayMs?: number;
}

const SseConnector: React.FC<SseConnectorProps> = ({ onEvent, onOpen, onError, retry = true, maxRetries = 5, retryDelayMs = 2000 }) => {
  // Simple retry logic with linear backoff (fixed delay)
  const esRef = useRef<EventSource | null>(null);
  const retryCountRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const connect = () => {
      // Close any existing connection before starting a new one
      if (esRef.current) {
        try { esRef.current.close(); } catch { /* noop */ }
      }

      const es = new EventSource('/api/v1/transactions/stream');
      esRef.current = es;

      es.onopen = () => {
        retryCountRef.current = 0; // reset on successful open
        onOpen();
      };

      es.onmessage = (event) => {
        const transaction = JSON.parse(event.data);
        onEvent(transaction);
      };

      es.onerror = () => {
        onError();
        // Native EventSource attempts to reconnect; we add a simple cap/timeout fallback
        if (!retry) return;
        if (retryCountRef.current >= maxRetries) return;
        retryCountRef.current += 1;
        // Close before scheduling a new attempt
        try { es.close(); } catch { /* noop */ }
        // Schedule reconnect
        timerRef.current = window.setTimeout(() => {
          connect();
        }, retryDelayMs);
      };
    };

    connect();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (esRef.current) {
        try { esRef.current.close(); } catch { /* noop */ }
      }
    };
    // Run once to mirror original behavior
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default SseConnector;
