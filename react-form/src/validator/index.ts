export type Validator<T extends any> = (value: T) => Promise<string> | null;
