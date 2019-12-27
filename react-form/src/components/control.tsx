import React from 'react';
import { makeFactory } from '../utils';

const [register, get] = makeFactory();

export interface ControlProps<T extends any> {
  value: T;
  onChange(): T;
}

export type ControlFC<Props extends ControlProps<any>> = React.FC<Props>;

export interface IControl<Props extends ControlProps<any>> {
  name: string;
  component: ControlFC<Props>;
}

export const InputControl: ControlFC<ControlProps<string>> = ({}) => {
  return <input />;
};

interface FormProps {
  controls: string[];
}

export const Form: React.FC<FormProps> = ({ controls }) => {
  return <div></div>;
};
