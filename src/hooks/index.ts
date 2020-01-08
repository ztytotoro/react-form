import { useState, useEffect } from 'react';

// Note: this hook can cause problems when the promsie returns
export function usePromise<T extends string | null>(
    promise: Promise<T>
): [T | null, boolean] {
    const [value, setValue] = useState<T | null>(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
        promise
            .then(val => setValue(val))
            .catch(() => setValue(null))
            .finally(() => setDone(true));
    });

    return [value, done];
}
