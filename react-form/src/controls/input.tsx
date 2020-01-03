import React from 'react';
import { ControlFC, IControl } from '../form';
import { ControlType } from './enum';

export const InputControl: ControlFC<string> = ({
  value,
  onChange,
  disabled
}) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value);
  }
  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export const Input: IControl = {
  id: ControlType.Input,
  component: InputControl
};
