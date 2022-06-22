/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { ListenerCallbackType } from './types';

class EventListenerService<T = never> {
  private index = 0;
  private listeners: Record<number, ListenerCallbackType<T>> = {};

  register(callback: ListenerCallbackType<T>): number {
    this.listeners[++this.index] = callback;
    return this.index;
  }

  unregister(index: number): void {
    delete this.listeners[index];
  }

  clear(): void {
    this.listeners = {};
  }

  async dispatch(data?: T): Promise<void> {
    const listeners = Object.values(this.listeners);
    for (const listener of listeners) {
      if ('function' === typeof listener) {
        await listener(data!);
      }
    }
  }
}

export default EventListenerService;
