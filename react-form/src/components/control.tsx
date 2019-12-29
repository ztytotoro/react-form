import React, { useState } from 'react';
import { makeFactory } from '../utils';

const [register, get] = makeFactory();

export interface ControlProps<T extends any> {
    value: T;
    onChange(): T;
    validator?(value: T): boolean;
}

export type ControlFC<Props extends ControlProps<any>> = React.FC<Props>;

export interface IControl<Props extends ControlProps<any>> {
    name: string;
    component: ControlFC<Props>;
}

export const InputControl: ControlFC<ControlProps<string>> = ({}) => {
    const [value, setValue] = useState<string>('');
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }
    return <input value={value} onChange={handleChange} />;
};

interface FormProps {
    controls: string[];
}

export const Form: React.FC<FormProps> = ({ controls }) => {
    return (
        <div>
            {controls.map(control => (
                <div></div>
            ))}
        </div>
    );
};
