import { Store } from './store';

export interface Factory<T = any> {
  [key: string]: T;
}

export type Constructor<T> = new (...args: any[]) => T;

export function makeFactory<T = any>(): [
  (key: string | string[], constructor: Constructor<T>) => void,
  (key?: string) => Constructor<T> | null
] {
  const store = new Store();

  const register = (key: string | string[], constructor: Constructor<T>) => {
    if (typeof key === 'string') {
      store.set(key, constructor);
    } else if (key instanceof Array) {
      key.forEach(k => {
        store.set(k, constructor);
      });
    }
  };

  const get = (key?: string) => {
    if (key === null || key === undefined) {
      return null;
    }
    return store.get<Constructor<T>>(key);
  };

  return [register, get];
}

export function makeSet<T = any>(): [(item: T) => void, () => Set<T>] {
  const set = new Set<any>();

  const add = (item: T) => {
    set.add(item);
  };

  const get = () => set;

  return [add, get];
}
