import React from 'react';
import { ControlFC, IControl } from 'react-formq';
import { ControlType } from './enum';
import { Checkbox } from 'antd';

const Control: ControlFC<boolean> = ({ value, onChange, disabled }) => {
  return (
    <Checkbox
      checked={value}
      disabled={disabled}
      onChange={e => {
        onChange(e.target.checked);
      }}
    ></Checkbox>
  );
};

export const CheckboxControl: IControl = {
  id: ControlType.Checkbox,
  component: Control
};
