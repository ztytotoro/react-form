import React, { useState } from 'react';
import { makeFactory } from '../utils';

const [registerGroup, getGroup] = makeFactory();

export interface ControlProps<T extends any> {
  value: T;
  onChange?(value: T): void;
}

export type ControlFC<T> = React.FC<ControlProps<T>>;

export interface IControl<T> {
  name: string;
  component: ControlFC<T>;
  validator(value: T): boolean;
}

export interface ControlForm {
  controls: string[];
  group?: string;
  alias: string;
  // TODO
}

export const InputControl: ControlFC<string> = ({ value, onChange }) => {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(event.target.value);
  }
  return <input value={value} onChange={handleChange} />;
};

function useValues(controls: any) {
  const [map, setMap] = useState(new Map<string, any>());
  map.set('', {});
  return map;
}

interface FormProps {
  controls: IControl<any>[];
}

export const Form: React.FC<FormProps> = ({ controls }) => {
  const formValue = useValues(controls);
  return (
    <div>
      {controls.map(control => (
        <control.component
          value={formValue.get(control.name).value}
          onChange={formValue.get(control.name).onChange}
        ></control.component>
      ))}
    </div>
  );
};

export function mapControlForm(form: ControlForm) {
  const group = getGroup(form.group);
}
