type Listener = (message: string) => void;

// A tiny stand-in for any identity-based external API (an event emitter,
// window.addEventListener, a chart library): unsubscribe only works when it is
// handed the exact same function object that subscribe was.
const listeners = new Set<Listener>();
const subscribeCounts = new Map<string, number>();

export const eventBus = {
  subscribe(owner: string, listener: Listener): void {
    listeners.add(listener);
    subscribeCounts.set(owner, (subscribeCounts.get(owner) ?? 0) + 1);
  },
  unsubscribe(listener: Listener): void {
    listeners.delete(listener);
  },
  subscribeCount(owner: string): number {
    return subscribeCounts.get(owner) ?? 0;
  },
};
