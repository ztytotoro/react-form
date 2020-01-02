import { FormItemKind, FormItemBase } from './definition';
import { getControl } from './control';
import { getGroup } from './group';

export function getComponent(formItem: FormItemBase<any>) {
  const getItem =
    formItem.kind === FormItemKind.Control ? getControl : getGroup;
  return getItem(formItem.type);
}
