import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';

// Lightweight EventSource mock
class MockEventSource {
  static instances: MockEventSource[] = [];
  url: string;
  onopen: (() => void) | null = null;
  onmessage: ((ev: { data: string }) => void) | null = null;
  onerror: ((ev?: any) => void) | null = null;
  closed = false;

  constructor(url: string) {
    this.url = url;
    MockEventSource.instances.push(this);
  }

  close() {
    this.closed = true;
  }

  emitOpen() {
    this.onopen && this.onopen();
  }

  emitMessage(payload: unknown) {
    this.onmessage && this.onmessage({ data: JSON.stringify(payload) });
  }

  emitError() {
    this.onerror && this.onerror(new Event('error'));
  }
}

// @ts-ignore
global.EventSource = MockEventSource as any;

import SseConnector from './SseConnector';

describe('SseConnector', () => {
  beforeEach(() => {
    // Reset instances and timers between tests
    MockEventSource.instances = [];
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('invokes onOpen when connection opens', () => {
    const onOpen = jest.fn();
    const onEvent = jest.fn();
    const onError = jest.fn();

    render(
      <SseConnector onOpen={onOpen} onEvent={onEvent} onError={onError} />
    );

    const es = MockEventSource.instances[0];
    expect(es).toBeTruthy();

    es.emitOpen();
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  test('parses message payload and calls onEvent', () => {
    const onOpen = jest.fn();
    const onEvent = jest.fn();
    const onError = jest.fn();

    render(
      <SseConnector onOpen={onOpen} onEvent={onEvent} onError={onError} />
    );

    const es = MockEventSource.instances[0];
    const payload = { id: 'tx1', value: 123 };
    es.emitMessage(payload);

    expect(onEvent).toHaveBeenCalledWith(expect.objectContaining(payload));
  });

  test('retries on error up to maxRetries with delay', () => {
    const onOpen = jest.fn();
    const onEvent = jest.fn();
    const onError = jest.fn();

    render(
      <SseConnector
        onOpen={onOpen}
        onEvent={onEvent}
        onError={onError}
        retry
        maxRetries={2}
        retryDelayMs={50}
      />
    );

    // First instance should be created immediately
    expect(MockEventSource.instances.length).toBe(1);
    const first = MockEventSource.instances[0];

    // Trigger an error -> schedule reconnect
    first.emitError();
    expect(onError).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(50);
    });
    // Second instance created
    expect(MockEventSource.instances.length).toBe(2);

    // Trigger another error -> schedule reconnect again (maxRetries=2)
    const second = MockEventSource.instances[1];
    second.emitError();
    expect(onError).toHaveBeenCalledTimes(2);

    act(() => {
      jest.advanceTimersByTime(50);
    });
    // Third instance created (final retry)
    expect(MockEventSource.instances.length).toBe(3);
  });

  test('cleans up: closes EventSource on unmount', () => {
    const onOpen = jest.fn();
    const onEvent = jest.fn();
    const onError = jest.fn();

    const { unmount } = render(
      <SseConnector onOpen={onOpen} onEvent={onEvent} onError={onError} />
    );

    const es = MockEventSource.instances[0];
    expect(es.closed).toBe(false);

    unmount();
    expect(es.closed).toBe(true);
  });
});

