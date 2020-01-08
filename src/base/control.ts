import { makeFactory } from '../utils';
import { ControlFC } from '../form/definition';

export const [registerControl, getControl] = makeFactory<ControlFC<any>>();

export function useControls(
  controls: {
    id: string;
    component: ControlFC<any>;
  }[]
) {
  controls.forEach(control => {
    registerControl(control.id, control.component);
  });
}
