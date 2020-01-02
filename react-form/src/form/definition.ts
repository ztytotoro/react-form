import { Validator } from '../validator';

export interface ControlProps<T extends any> {
  value: T;
  onChange?(value: T): void;
}

export type ControlFC<T> = React.FC<ControlProps<T>>;

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
}

export interface ControlDefinition<T extends any> extends FormItemBase<T> {
  label: Promise<string>;
}

export interface GroupDefinition<T extends any> extends FormItemBase<T> {
  label?: Promise<string>;
  params?: any;
  controls: ControlDefinition<any>[];
}

export type FormDefinition = (ControlDefinition<any> | GroupDefinition<any>)[];
