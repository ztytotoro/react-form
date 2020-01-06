import React from 'react';
import { ControlFC, IControl } from 'react-formq';
import { ControlType } from './enum';
import { InputNumber } from 'antd';

const Control: ControlFC<number | undefined, InputNumberParams> = ({
  value,
  onChange,
  disabled,
  params
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
  component: Control
};

export interface InputNumberParams {
  min: number;
  max: number;
}
