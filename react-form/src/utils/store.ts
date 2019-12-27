export interface IStore {
  get<T extends any>(key: string): T;
  set(key: string, item: any): void;
}

export interface IStoreConstructor {
  new (): IStore;
}

class DefaultStore implements IStore {
  private store: {
    [key: string]: any;
  } = {};

  get<T extends any>(key: string) {
    return this.store[key] as T;
  }

  set(key: string, item: any) {
    this.store[key] = item;
  }
}

let storeFactory: IStoreConstructor = DefaultStore;

export class Store {
  private store: IStore;

  constructor(factory = storeFactory) {
    this.store = new factory();
  }

  static setDefaultStore(factory: IStoreConstructor) {
    storeFactory = factory;
  }

  get<T extends any>(key: string) {
    return this.store.get<T>(key);
  }

  set(key: string, item: any) {
    this.store.set(key, item);
  }
}
