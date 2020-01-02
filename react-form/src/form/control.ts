import { makeFactory } from '../utils';
import { ControlFC } from './definition';

export const [registerControl, getControl] = makeFactory<ControlFC<any>>();
