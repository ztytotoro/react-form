import React from 'react';
import { ControlFC, IControl } from 'react-formq';
import { ControlType } from './enum';
import { Switch } from 'antd';

const Control: ControlFC<boolean> = ({ value, onChange, disabled }) => {
  return (
    <Switch checked={value} disabled={disabled} onChange={onChange}></Switch>
  );
};

export const SwitchControl: IControl = {
  id: ControlType.Switch,
  component: Control
};
