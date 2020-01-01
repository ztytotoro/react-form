export class Form {
    controls: any[] = [];
}

interface IControlOptions<T> {
    validator(value: T): boolean;
}

export class FormControl<T extends any> {
    private _disabled = false;

    constructor(private validator?: (value: T) => boolean) {}

    get disabled() {
        return this._disabled;
    }

    get isValid() {
        return this.validator?.(this.value) ?? true;
    }

    value!: T;

    enable() {
        this._disabled = false;
    }

    disable() {
        this._disabled = true;
    }
}
