import React from 'react';
import { ControlFC, IControl } from '../form';
import { ControlType } from './enum';

export const InputControl: ControlFC<string, InputNumberParams> = ({
  value,
  onChange,
  disabled,
  params
}) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(event.target.value);
  }
  return (
    <input
      type="number"
      value={value}
      onChange={handleChange}
      disabled={disabled}
      min={params?.min}
      max={params?.max}
    />
  );
};

export const InputNumber: IControl = {
  id: ControlType.InputNumber,
  component: InputControl
};

export interface InputNumberParams {
  min: number;
  max: number;
}
