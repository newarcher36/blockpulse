import { useEffect, useRef, useState } from 'react';
import { UseSSEProps } from '../model/props';

/**
 * Hook that connects to a Server-Sent Events (SSE) endpoint and
 * exposes the connection status.
 */
export const useSSE = ({ url, onMessage }: UseSSEProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    let reconnectTimer: number;

    const connect = () => {
      try {
        eventSourceRef.current = new EventSource(url);

        eventSourceRef.current.onopen = () => {
          setIsConnected(true);
          setConnectionStatus('Connected');
          console.log('SSE connected');
        };

        eventSourceRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            onMessage(data);
          } catch (err) {
            console.error('Error parsing SSE message:', err);
          }
        };

        eventSourceRef.current.onerror = () => {
          setIsConnected(false);
          setConnectionStatus('Disconnected');
          eventSourceRef.current?.close();
          reconnectTimer = window.setTimeout(connect, 5000);
        };
      } catch (err) {
        console.error('Failed to connect SSE:', err);
        setConnectionStatus('Error');
        reconnectTimer = window.setTimeout(connect, 5000);
      }
    };

    connect();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      clearTimeout(reconnectTimer);
    };
  }, [url, onMessage]);

  return {
    isConnected,
    connectionStatus,
  };
};

