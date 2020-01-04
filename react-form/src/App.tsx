import React from 'react';
import './App.css';
import { FormDefinition, FormItemKind, makeForm } from './form';
import { RenderedGroup } from './components/group';
import { ControlType } from './controls/enum';
import { ColorValidator } from './validators';
import { GroupType } from './groups';

const formDef: FormDefinition = {
    backgroundColor: {
        kind: FormItemKind.Control,
        type: ControlType.Color,
        label: Promise.resolve('背景颜色'),
        default: 'red',
        validators: [ColorValidator],
    },
    enableFont: {
        kind: FormItemKind.Control,
        type: ControlType.Switch,
        label: Promise.resolve('启用字体'),
        default: true,
    },
    font: {
        kind: FormItemKind.Group,
        label: Promise.resolve('字体'),
        type: GroupType.Column,
        params: {
            column: 2,
        },
        default: {
            fontColor: 'black',
            fontSize: 16,
        },
        onChange(control) {
            if (control.value['fontColor'] !== 'red') {
                control.get('fontSize')?.disable();
            } else {
                control.get('fontSize')?.enable();
            }
        },
        controls: {
            fontStyle: {
                kind: FormItemKind.Control,
                label: Promise.resolve('字体样式'),
                type: ControlType.Select,
                default: 'Microsoft Yahei',
                params: {
                    options: [
                        {
                            value: 'Microsoft Yahei',
                            label: Promise.resolve('微软雅黑'),
                        },
                    ],
                },
            },
            fontColor: {
                kind: FormItemKind.Control,
                label: Promise.resolve('字体颜色'),
                type: ControlType.Color,
            },
            fontSize: {
                kind: FormItemKind.Control,
                label: Promise.resolve('字体大小'),
                type: ControlType.InputNumber,
                default: 17,
                params: {
                    min: 10,
                },
            },
        },
    },
};

const form = makeForm(formDef);

form.onChange(item => console.log(item.value));

const App: React.FC = () => {
    return (
        <div className="App">
            <div className="Form">
                <RenderedGroup group={form}></RenderedGroup>
            </div>
        </div>
    );
};

export default App;
