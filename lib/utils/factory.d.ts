export interface Factory<T = any> {
    [key: string]: T;
}
export declare type Constructor<T> = new (...args: any[]) => T;
export declare function makeFactory<T = any>(): [(key: string | string[], value: T) => void, (key?: string) => T | null];
export declare function makeSet<T = any>(): [(item: T) => void, () => Set<T>];
