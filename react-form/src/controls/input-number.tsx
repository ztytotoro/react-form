import React from 'react';
import { ControlFC, IControl } from '../form';
import { ControlType } from './enum';
import { InputNumber } from 'antd';

export const component: ControlFC<number | undefined, InputNumberParams> = ({
    value,
    onChange,
    disabled,
    params,
}) => {
    return (
        <InputNumber
            value={value}
            onChange={onChange}
            disabled={disabled}
            min={params?.min}
            max={params?.max}
        ></InputNumber>
    );
};

export const InputNumberControl: IControl = {
    id: ControlType.InputNumber,
    component,
};

export interface InputNumberParams {
    min: number;
    max: number;
}
