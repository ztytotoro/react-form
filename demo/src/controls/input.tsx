import React from 'react';
import { ControlFC, IControl } from 'react-formq';
import { ControlType } from './enum';
import { Input } from 'antd';

const Control: ControlFC<string> = ({ value, onChange, disabled }) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }
  return (
    <Input value={value} onChange={handleChange} disabled={disabled}></Input>
  );
};

export const InputControl: IControl = {
  id: ControlType.Input,
  component: Control
};
