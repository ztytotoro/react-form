import { ColorrControl } from './color';
import { InputNumberControl } from './input-number';
import { InputControl } from './input';
import { SelectControl } from './select';
import { CheckboxControl } from './checkbox';
import { SwitchControl } from './switch';

export const controls = [
    InputNumberControl,
    InputControl,
    ColorrControl,
    SelectControl,
    CheckboxControl,
    SwitchControl,
];
export * from './enum';
