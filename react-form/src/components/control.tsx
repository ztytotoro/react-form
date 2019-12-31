import React, { useState } from 'react';
import { makeFactory } from '../utils';

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
  alias: string;
  validator(value: any): boolean;
}

export interface ControlFormItem extends ControlFormBase {
  type: string;
}

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
  const GroupComponent = getGroup(def.groupKey);
}

const RenderedControls: React.FC<{ controls: IControl<any>[] }> = ({
  controls
}) => {
  // 将control渲染成数组，返回一个组件，此组件会收集合并所有子组件的值，校验并以事件的形式传出
  return <></>;
};
/* ---- #endregion ---- */

/* ---- #region Group ---- */

export interface ControlGroup extends ControlFormBase {
  groupKey: string;
  controls: ControlFormItem[];
}

const [registerGroup, getGroup] = makeFactory();

// GroupComponent 只是一个容器， 不处理任何逻辑
const DefaultGroup: React.FC = ({ children }) => {
  return <div>{children}</div>;
};

/* ---- #endregion ---- */
