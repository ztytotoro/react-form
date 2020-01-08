import React from 'react';
import { ControlFC, IControl, PromisedText } from 'react-formq';
import { Select } from 'antd';
import { ControlType } from './enum';

interface SelectOption {
  value: string | number;
  label: Promise<string>;
}

export interface SelectParams {
  options: SelectOption[];
}

const { Option } = Select;

const Control: ControlFC<string | number, SelectParams> = ({
  value,
  onChange,
  disabled,
  params
}) => {
  return (
    <Select
      value={value}
      defaultValue={value}
      onChange={onChange}
      disabled={disabled}
    >
      {params?.options?.map((option, index) => (
        <Option value={option.value} key={index}>
          <PromisedText textPromise={option.label}></PromisedText>
        </Option>
      ))}
    </Select>
  );
};

export const SelectControl: IControl = {
  id: ControlType.Select,
  component: Control
};
