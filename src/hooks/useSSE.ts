import {useCallback, useEffect, useRef, useState} from 'react';
import {UseSSEProps} from "../model/props";


const useSSE = ({url, onMessage, retryBaseMs = 1000, retryMaxMs = 15000, maxRetries = 0} : UseSSEProps) => {
    const [isConnected, setIsConnected] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<'Disconnected' | 'Connecting' | 'Connected' | 'Reconnecting' | 'Error'>('Disconnected');
    const esRef = useRef<EventSource | null>(null);
    const timerRef = useRef<number | null>(null);
    const attemptsRef = useRef(0);
    const unmountedRef = useRef(false);

    const clearTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const scheduleReconnect = useCallback(() => {
        if (unmountedRef.current) return;
        if (maxRetries > 0 && attemptsRef.current >= maxRetries) {
            setConnectionStatus('Error');
            return;
        }
        attemptsRef.current += 1;
        const delay = Math.min(retryMaxMs, retryBaseMs * 2 ** (attemptsRef.current - 1));
        setConnectionStatus(attemptsRef.current === 1 ? 'Reconnecting' : 'Reconnecting');
        clearTimer();
        timerRef.current = window.setTimeout(() => connect(), delay);
    }, [retryBaseMs, retryMaxMs, maxRetries]);

    const connect = useCallback(() => {
        if (unmountedRef.current) return;

        // Avoid duplicate instances
        if (esRef.current && esRef.current.readyState !== EventSource.CLOSED) {
            return;
        }

        // Clean up any prior instance just in case
        if (esRef.current) {
            esRef.current.close();
            esRef.current = null;
        }
        clearTimer();

        setConnectionStatus(attemptsRef.current > 0 ? 'Reconnecting' : 'Connecting');

        try {
            const es = new EventSource(url, {withCredentials: false}); // set true if you need cookies
            esRef.current = es;

            es.onopen = () => {
                attemptsRef.current = 0;
                setIsConnected(true);
                setConnectionStatus('Connected');
            };

            es.onmessage = (evt) => {
                try {
                    onMessage(JSON.parse(evt.data));
                } catch (e) {
                    // do not close on handler errors
                    // eslint-disable-next-line no-console
                    console.error('SSE handler error:', e);
                }
            };

            es.onerror = () => {
                // Do NOT create a second instance here; let *us* schedule retries.
                setIsConnected(false);

                // If the browser will retry automatically, we can simply wait.
                // However some proxies emit terminal errors; to be robust, close and schedule.
                try {
                    es.close();
                } catch {}
                esRef.current = null;

                scheduleReconnect();
            };
        } catch (e) {
            setIsConnected(false);
            setConnectionStatus('Error');
            scheduleReconnect();
        }
    }, [url, onMessage, scheduleReconnect]);

    const disconnect = useCallback(() => {
        unmountedRef.current = true;
        clearTimer();
        if (esRef.current) {
            try {
                esRef.current.close();
            } catch {
            }
            esRef.current = null;
        }
        setIsConnected(false);
        setConnectionStatus('Disconnected');
    }, []);

    useEffect(() => {
        unmountedRef.current = false;
        connect();
        return () => {
            disconnect();
        };
        // Only re-connect when URL or handler identity truly changes
    }, [url, connect, disconnect]);

    return {isConnected, connectionStatus, connect, disconnect};
}

export default useSSE;