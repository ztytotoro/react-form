import { useState } from 'react';
export function usePromise<T>(promise: Promise<T>) {
    const [value, setValue] = useState<T | null>(null);
    promise.then(val => setValue(val)).catch(_ => setValue(null));
    return [value];
}
