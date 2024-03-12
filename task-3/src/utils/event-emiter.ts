type EventEmiterListener = (...args: any[]) => void;

export class EventEmitter {
  listeners: { [key: string]: EventEmiterListener[] } = {};

  addListener(eventName: string, fn: EventEmiterListener) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].push(fn);
    } else {
      this.listeners[eventName] = [fn];
    }
  }

  on(eventName: string, fn: EventEmiterListener) {
    this.addListener(eventName, fn);
  }

  removeListener(eventName: string, fn: EventEmiterListener) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => listener !== fn
      );
    }
  }

  off(eventName: string, fn: EventEmiterListener) {
    this.removeListener(eventName, fn);
  }

  once(eventName: string, fn: EventEmiterListener) {
    const onceWrapper = (...args: any[]) => {
      fn(...args);
      this.listeners[eventName] = this.listeners[eventName].filter(
        (listener) => listener !== onceWrapper
      );
    };
    this.addListener(eventName, onceWrapper);
  }

  emit(eventName: string, ...args: any[]) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach((fn) => {
        fn(...args);
      });
    }
  }

  listenerCount(eventName: string) {
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }

  rawListeners(eventName: string) {
    return [...this.listeners[eventName]];
  }
}
