import { GroupDefinition, FormGroup } from './form';
import { useControls, useGroups } from './base';
export * from './form';
export * from './validator';
export { Store } from './utils';
export { PromisedText, RenderedGroup } from './components';
export { useControls, useGroups };
export declare function setup(handle: (fn: {
    useControls: typeof useControls;
    useGroups: typeof useGroups;
}) => void): void;
export declare function renderForm(formDef: GroupDefinition<any>, container: HTMLElement): FormGroup<any>;
