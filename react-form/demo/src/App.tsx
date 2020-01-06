import React from 'react';
import './App.css';
import { FormItemKind, GroupDefinition, FormGroup } from './form';
import { RenderedGroup } from './components/group';
import { ControlType } from './controls/enum';
import { ColorValidator } from './validators';
import { GroupType } from './groups';

const formDef: GroupDefinition<any> = {
    kind: FormItemKind.Group,
    type: GroupType.Tab,
    params: {
        groups: [
            {
                name: 'basic',
                label: Promise.resolve('基本'),
            },
            {
                name: 'advanced',
                label: Promise.resolve('高级'),
            },
        ],
    },
    controls: {
        backgroundColor: {
            kind: FormItemKind.Control,
            type: ControlType.Color,
            label: Promise.resolve('背景颜色'),
            default: 'red',
            validators: [ColorValidator],
            groupParams: {
                group: 'basic',
            },
        },
        enableFont: {
            kind: FormItemKind.Control,
            type: ControlType.Switch,
            label: Promise.resolve('启用字体'),
            default: true,
            groupParams: {
                group: 'advanced',
            },
        },
        font: {
            kind: FormItemKind.Group,
            label: Promise.resolve('字体'),
            type: GroupType.Column,
            params: {
                column: 2,
            },
            groupParams: {
                group: 'advanced',
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
    },
};

const form = new FormGroup('$root', formDef);

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
