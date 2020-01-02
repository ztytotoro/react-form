import React from 'react';
import logo from './logo.svg';
import './App.css';

const form = [
  {
    kind: 'control',
    name: 'background-color',
    type: 'color-selector',
    default: 'red',
    validator: (_: string) => true
  },
  {
    kind: 'group',
    name: 'font',
    type: 'popover',
    params: {
      column: 2
    },
    controls: [
      {
        kind: 'control',
        name: 'font-color',
        type: 'color-selector'
      },
      {
        kind: 'control',
        name: 'font-size',
        type: 'input-number'
      }
    ]
  }
];

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
    </div>
  );
};

export default App;
