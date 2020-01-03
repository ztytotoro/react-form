import { Validator } from '../validator';
import { FormGroup, FormControl } from './form';

export interface ControlProps<T extends any, TParams extends any> {
  value: T;
  onChange(value: T): void;
  disabled?: boolean;
  params?: TParams;
}

export type ControlFC<T, TParams = any> = React.FC<ControlProps<T, TParams>>;

export interface GroupProps<T extends any> {
  // TODO
  value: T;
  onChange?(value: T): void;
}

export enum FormItemKind {
  Control = 'Control',
  Group = 'Group'
}

export interface FormItemBase<T extends any> {
  kind: FormItemKind;
  type: string;
  name: string;
  default?: T;
  validators?: Validator<T>[];
  params?: any;
  onChange?(
    formItem: this extends { kind: FormItemKind.Control }
      ? FormControl<any>
      : FormGroup<any>
  ): void;
}

export type FormValueType<T> = T extends FormItemBase<infer P> ? P : unknown;

export interface ControlDefinition<T extends any> extends FormItemBase<T> {
  label: Promise<string>;
}

export interface GroupDefinition<T extends any> extends FormItemBase<T> {
  label?: Promise<string>;
  controls: FormDefinition;
}

export type FormDefinition = (ControlDefinition<any> | GroupDefinition<any>)[];

export interface IControl {
  id: string;
  component: ControlFC<any>;
}
