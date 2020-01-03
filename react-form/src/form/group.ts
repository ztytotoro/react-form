import { makeFactory } from '../utils';
import { GroupFC } from './definition';

export const [registerGroup, getGroup] = makeFactory<GroupFC<any>>();

export function useGroups(
  groups: {
    id: string;
    component: GroupFC<any>;
  }[]
) {
  groups.forEach(group => {
    registerGroup(group.id, group.component);
  });
}
