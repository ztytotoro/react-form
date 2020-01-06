export declare type Validator<T extends any> = (value: T | null) => Promise<string> | null;
