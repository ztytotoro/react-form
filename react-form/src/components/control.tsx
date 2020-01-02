import React, { useState } from 'react';
import { makeFactory } from '../utils';
import { usePromise } from '../hooks';

/* ---- #region Base ---- */
export interface ControlProps<T extends any> {
  value: T;
  onChange?(value: T): void;
}

export type ControlFC<T> = React.FC<ControlProps<T>>;

export interface IControl<T> {
  name: string;
  component: ControlFC<T>;
}

export interface ControlFormBase {
  key: string;
  type: 'control' | 'group';
  alias: string;
  label: Promise<string>;
  validator(value: any): boolean;
}

export interface ControlFormItem extends ControlFormBase {}

export type ControlForm = (ControlFormItem | ControlGroup)[];

interface FormProps {
  controls: IControl<any>[];
}
/* ---- #endregion ---- */

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

const [registerControl, getControl] = makeFactory<ControlFC<any>>();

/* ---- #region Form ---- */
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
  const value = {} as any;
  form.forEach(item => {
    value[item.alias] = void 0;
  });
}

function makeControlItem(def: ControlFormItem) {}

function makeControlGroup(def: ControlGroup) {
  const GroupComponent = getGroup(def.key);
}

const RenderedControls: React.FC<{ controls: ControlFormItem[] }> = ({
  controls
}) => {
  // 将control渲染成数组，返回一个组件，此组件会收集合并所有子组件的值，校验并以事件的形式传出

  return <>{controls.map(control => {})}</>;
};

const RenderedControl: React.FC<{
  control: ControlFormItem;
  initValue: any;
  onChange: (value: any) => void;
}> = ({ control, initValue, onChange }) => {
  const Control = getControl(control.key);

  if (Control) {
    const [text] = usePromise(control.label);
    const [value, setValue] = useState(initValue);
    return (
      <>
        <label>{text}</label>
        <Control
          value={value}
          onChange={newValue => {
            setValue(newValue);
            onChange(newValue);
          }}
        ></Control>
      </>
    );
  }
  return <></>;
};
/* ---- #endregion ---- */

/* ---- #region Group ---- */

export interface ControlGroup extends ControlFormBase {
  controls: ControlFormItem[];
}

const [registerGroup, getGroup] = makeFactory();

// GroupComponent 只是一个容器， 不处理任何逻辑
const DefaultGroup: React.FC = ({ children }) => {
  return <div>{children}</div>;
};

/* ---- #endregion ---- */

/* ---- #region Demo ---- */
function control(...args: any[]) {}
function formGroup<T>(form: T, validator: (value: T) => boolean) {}
const Input = {
  key: 'Input'
};
const settings = formGroup(
  {
    name: [InputControl]
  },
  value => {
    return true;
  }
);
// 根据一个属性设置其他属性的禁用启用
/* ---- #endregion ---- */
