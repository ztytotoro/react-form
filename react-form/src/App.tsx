import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FormDefinition, FormItemKind, makeForm } from './form';
import { RenderedGroup } from './components/group';
import { ControlType } from './controls/enum';
import { ColorValidator } from './validators';

const formDef: FormDefinition = [
  {
    kind: FormItemKind.Control,
    name: 'background-color',
    type: ControlType.Input,
    label: Promise.resolve('背景颜色'),
    default: 'red',
    validators: [ColorValidator]
  },
  {
    kind: FormItemKind.Group,
    name: 'font',
    label: Promise.resolve('字体'),
    type: 'popover',
    params: {
      column: 2
    },
    default: {
      'font-color': 'black',
      'font-size': 16
    },
    onChange(control) {
      if (control.value['font-color'] !== 'red') {
        control.get('font-size')?.disable();
      } else {
        control.get('font-size')?.enable();
      }
    },
    controls: [
      {
        kind: FormItemKind.Control,
        name: 'font-color',
        label: Promise.resolve('字体颜色'),
        type: ControlType.Input
      },
      {
        kind: FormItemKind.Control,
        name: 'font-size',
        label: Promise.resolve('字体大小'),
        type: ControlType.InputNumber,
        default: 17,
        params: {
          min: 10
        }
      }
    ]
  }
];

const form = makeForm(formDef);

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <RenderedGroup group={form}></RenderedGroup>
    </div>
  );
};

export default App;
