import { Validator } from '../validator';

abstract class FormBase<T extends any> {
  private _disabled = false;
  private _value!: T;

  constructor(protected validator?: Validator<T>) {}

  get value() {
    return this._value;
  }

  get disabled() {
    return this._disabled;
  }

  get isValid() {
    return this.validator?.(this.value) === null;
  }

  get errorTip() {
    return this.validator?.(this.value) ?? null;
  }

  enable() {
    this._disabled = false;
  }

  disable() {
    this._disabled = true;
  }

  setValue(newValue: T) {
    this._value = newValue;
    this.onValueChange(this.value);
  }

  onValueChange(_: T) {}
}

export class FormGroup<T extends any> extends FormBase<T> {
  onValueChange(value: T) {
    Object.keys(value).forEach(key => {
      this.controlMap.set(key, value[key]);
    });
  }

  get controlMap() {
    return new Map<string, FormControl<any> | FormGroup<any>>();
  }
}

export class FormControl<T extends any> extends FormBase<T> {}
