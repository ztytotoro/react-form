import { Subject } from 'rxjs';
import {
  FormItemBase,
  GroupDefinition,
  ControlDefinition,
  FormValueType,
  FormDefinition,
  FormItemKind
} from './definition';

export abstract class FormBase<
  TDefinition extends FormItemBase<any>,
  TValue = FormValueType<TDefinition>
> {
  protected error$ = new Subject<string[]>();
  protected valueChange$ = new Subject<void>();
  protected stateChange$ = new Subject<void>();
  private _visible = true;

  constructor(private _definition: TDefinition) {
    this.valueChange$.subscribe(() => {
      this.validate();
      this.definition.onChange?.(this as any);
    });
  }

  abstract get value(): TValue | null;

  abstract get group(): FormGroup<any> | null;

  get isValid() {
    return this.errorTips.length === 0;
  }

  get errorTips() {
    const errorTips: string[] = [];
    this.validators?.forEach(v => {
      const result = v(this.value);
      if (result) {
        result.then(str => errorTips.push(str));
      }
    });
    return errorTips;
  }

  validate() {
    const tasks: Promise<string>[] = [];
    this.validators?.forEach(v => {
      const result = v(this.value);
      if (result) {
        tasks.push(result);
      }
    });
    if (tasks.length > 0) {
      Promise.all(tasks).then(result => this.error$.next(result));
    }
  }

  get definition() {
    return this._definition;
  }

  get default() {
    return this.definition.default;
  }

  get name() {
    return this.definition.name;
  }

  get kind() {
    return this.definition.kind;
  }

  get validators() {
    return this.definition.validators;
  }

  get visible() {
    return this._visible;
  }

  abstract enable(): void;

  abstract disable(): void;

  abstract setValue(newValue: TValue | null): void;

  abstract reset(): void;

  show() {
    this._visible = true;
    this.stateChange$.next();
  }

  hide() {
    this._visible = false;
    this.stateChange$.next();
  }

  onError(cb: (errorTips: string[]) => void) {
    this.error$.subscribe(cb);
  }

  onChange(cb: (formItem: FormControl<any> | FormGroup<any>) => void) {
    this.valueChange$.subscribe(() => cb(this as any));
  }

  onStateChange(cb: () => void) {
    this.stateChange$.subscribe(cb);
  }

  dispose() {
    this.error$.unsubscribe();
    this.valueChange$.unsubscribe();
  }
}

export class FormControl<T extends any> extends FormBase<ControlDefinition<T>> {
  private _value: T | null = null;
  private _disabled = false;

  constructor(
    definition: ControlDefinition<T>,
    private _group: FormGroup<any>
  ) {
    super(definition);
    this.reset();
  }

  get value() {
    return this._value;
  }

  get group() {
    return this._group;
  }

  get disabled() {
    return this._disabled;
  }

  enable() {
    this._disabled = false;
    this.stateChange$.next();
  }

  disable() {
    this._disabled = true;
    this.stateChange$.next();
  }

  setValue(newValue: T | null) {
    this._value = newValue;
    this.valueChange$.next();
    this.stateChange$.next();
  }

  reset() {
    this.setValue(this.default ?? this.group.default?.[this.name] ?? null);
  }
}

export class FormGroup<T extends any> extends FormBase<GroupDefinition<T>> {
  private _controlMap = new Map<string, FormControl<any> | FormGroup<any>>();

  constructor(
    definition: GroupDefinition<T>,
    private _group: FormGroup<any> | null = null
  ) {
    super(definition);
    definition.controls.forEach(control => {
      if (control.kind === FormItemKind.Control) {
        this._controlMap.set(
          control.name,
          new FormControl(control as ControlDefinition<any>, this)
        );
      } else if (control.kind === FormItemKind.Group) {
        this._controlMap.set(
          control.name,
          new FormGroup(control as GroupDefinition<any>, this)
        );
      }
    });
    this.controlList.forEach(control =>
      control.onChange(() => this.valueChange$.next())
    );
    this.reset();
  }

  get group() {
    return this._group;
  }

  get controlMap() {
    return this._controlMap;
  }

  get controls() {
    const controls: {
      [key: string]: FormControl<any> | FormGroup<any>;
    } = {};
    this.controlMap.forEach((v, k) => {
      controls[k] = v;
    });
    return controls;
  }

  get controlList() {
    return Array.from(this.controlMap.values());
  }

  get value() {
    const value = {} as T;
    this.controlMap.forEach((v, k) => {
      value[k] = v.value;
    });
    return value;
  }

  setValue(newValue: T | null) {
    this.controlMap.forEach((v, k) => {
      v.setValue(newValue?.[k] ?? null);
    });
  }

  reset() {
    this.controlMap.forEach(v => {
      v.reset();
    });
  }

  enable() {
    this.controlMap.forEach(v => {
      v.enable();
    });
  }

  disable() {
    this.controlMap.forEach(v => {
      v.disable();
    });
  }

  get(path: string | string[]): FormGroup<any> | FormControl<any> | null {
    if (typeof path === 'string') {
      path = path.split('.');
    }
    if (path.length > 0) {
      const name = path.shift();
      const item = this.controlMap.get(name as string);
      if (item?.kind === FormItemKind.Group) {
        return (item as FormGroup<any>).get(path);
      }
      if (item?.kind === FormItemKind.Control) {
        return path.length > 0 ? null : item;
      }
    }
    return this;
  }

  dispose() {
    super.dispose();
    this.controlList.forEach(control => control.dispose());
  }
}

export function makeForm(definition: FormDefinition) {
  return new FormGroup({
    kind: FormItemKind.Group,
    type: 'base',
    name: '',
    controls: definition
  });
}
