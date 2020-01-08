import { Subject } from 'rxjs';
import { FormItemBase, GroupDefinition, ControlDefinition, FormValueType, FormItemKind } from './definition';
export declare abstract class FormBase<TDefinition extends FormItemBase<any>, TValue = FormValueType<TDefinition>> {
    private _definition;
    protected error$: Subject<string[]>;
    protected valueChange$: Subject<void>;
    protected stateChange$: Subject<void>;
    private _visible;
    private _isValid;
    constructor(_definition: TDefinition);
    abstract get value(): TValue | null;
    abstract get group(): FormGroup<any> | null;
    get isValid(): boolean;
    validate(): void;
    get definition(): TDefinition;
    get default(): any;
    get kind(): FormItemKind;
    get validators(): import("..").Validator<any>[] | undefined;
    get visible(): boolean;
    abstract enable(): void;
    abstract disable(): void;
    abstract setValue(newValue: TValue | null): void;
    abstract reset(): void;
    abstract name: string;
    show(): void;
    hide(): void;
    onError(cb: (errorTips: string[]) => void): void;
    onChange(cb: (formItem: FormControl<any> | FormGroup<any>) => void): void;
    onStateChange(cb: () => void): void;
    dispose(): void;
}
export declare class FormControl<T extends any> extends FormBase<ControlDefinition<T>> {
    readonly name: string;
    private _group;
    private _value;
    private _disabled;
    constructor(name: string, definition: ControlDefinition<T>, _group: FormGroup<any>);
    get value(): T | null;
    get group(): FormGroup<any>;
    get disabled(): boolean;
    enable(): void;
    disable(): void;
    setValue(newValue: T | null): void;
    reset(): void;
}
export declare class FormGroup<T extends any> extends FormBase<GroupDefinition<T>> {
    readonly name: string;
    private _group;
    private _controlMap;
    constructor(name: string, definition: GroupDefinition<T>, _group?: FormGroup<any> | null);
    get group(): FormGroup<any> | null;
    get controlMap(): Map<string, FormGroup<any> | FormControl<any>>;
    get controls(): {
        [key: string]: FormGroup<any> | FormControl<any>;
    };
    get controlList(): (FormGroup<any> | FormControl<any>)[];
    get value(): T;
    setValue(newValue: T | null): void;
    reset(): void;
    enable(): void;
    disable(): void;
    get(path: string | string[]): FormGroup<any> | FormControl<any> | null;
    dispose(): void;
}
