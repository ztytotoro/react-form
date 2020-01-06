import React from 'react';
import ReactDOM from 'react-dom';
import { GroupDefinition, FormGroup } from './form';
import { RenderedGroup } from './components';
import { useControls, useGroups } from './base';

export * from './form';
export * from './validator';
export { Store } from './utils';
export { PromisedText } from './components';

export { useControls, useGroups };

export function setup(
  handle: (fn: {
    useControls: typeof useControls;
    useGroups: typeof useGroups;
  }) => void
) {
  handle({
    useControls,
    useGroups
  });
}

function makeForm(form: GroupDefinition<any>) {
  return new FormGroup('$root', form);
}

export function renderForm(
  formDef: GroupDefinition<any>,
  container: HTMLElement
) {
  const form = makeForm(formDef);
  ReactDOM.render(<RenderedGroup group={form}></RenderedGroup>, container);
  return form;
}
