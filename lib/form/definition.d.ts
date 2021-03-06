/// <reference types="react" />
import { Validator } from '../validator';
import { FormGroup, FormControl } from './form';
export interface ControlProps<T extends any, TParams extends any> {
    value: T;
    onChange(value: T): void;
    disabled?: boolean;
    params?: TParams;
}
export declare type ControlFC<T, TParams = any> = React.FC<ControlProps<T, TParams>>;
export interface GroupProps<TParams extends any, TItemParams = any> {
    params?: TParams;
    controls: ControlList<TItemParams>;
    visible: boolean;
    label?: Promise<string>;
}
export declare type GroupFC<TParams = any, TItemParams = any> = React.FC<GroupProps<TParams, TItemParams>>;
export declare enum FormItemKind {
    Control = "Control",
    Group = "Group"
}
export interface FormItemBase<T extends any> {
    kind: FormItemKind;
    type: string;
    default?: T;
    validators?: Validator<T>[];
    params?: any;
    groupParams?: any;
    onChange?(formItem: this extends {
        kind: FormItemKind.Control;
    } ? FormControl<any> : FormGroup<any>): void;
}
export declare type FormValueType<T> = T extends FormItemBase<infer P> ? P : unknown;
export interface ControlDefinition<T extends any> extends FormItemBase<T> {
    label: Promise<string>;
}
export interface GroupDefinition<T extends any> extends FormItemBase<T> {
    label?: Promise<string>;
    controls: FormDefinition;
}
export declare type FormDefinition = {
    [key: string]: ControlDefinition<any> | GroupDefinition<any>;
};
export interface IControl {
    id: string;
    component: ControlFC<any>;
}
export interface IGroup {
    id: string;
    component: GroupFC<any>;
}
export declare type ControlList<T = any> = {
    element: JSX.Element;
    groupParams?: T;
    name: string;
}[];
export declare type PickValue<T extends FormDefinition> = {
    [K in keyof T]: T[K] extends GroupDefinition<any> ? PickValue<T[K]['controls']> : any;
};
