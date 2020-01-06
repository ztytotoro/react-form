export interface IStore {
    get<T extends any>(key: string): T;
    set(key: string, item: any): void;
}
export interface IStoreConstructor {
    new (): IStore;
}
export declare class Store {
    private store;
    constructor(factory?: IStoreConstructor);
    static setDefaultStore(factory: IStoreConstructor): void;
    get<T extends any>(key: string): T;
    set(key: string, item: any): void;
}
