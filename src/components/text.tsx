import React from 'react';
import { usePromise } from '../hooks';

export const PromisedText: React.FC<{
    textPromise: Promise<string | null> | undefined | null;
}> = ({ textPromise }) => {
    const [text] = usePromise(textPromise ?? Promise.resolve(null));

    return text ? <>{text}</> : <></>;
};
