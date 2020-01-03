import React, { useEffect } from 'react';
import { FormGroup, FormControl, FormItemKind } from '../form';
import { RenderedControl } from './control';
import { useState } from 'react';

type ControlList = (ControlList | JSX.Element)[];

export function renderGroup(group: FormGroup<any>): ControlList {
  return group.controlList.map(control => {
    if (control.kind === FormItemKind.Control) {
      return (
        <RenderedControl
          key={control.name}
          control={control as FormControl<any>}
        ></RenderedControl>
      );
    }
    if (control.kind === FormItemKind.Group) {
      return <RenderedGroup group={control as FormGroup<any>}></RenderedGroup>;
    }
    return <></>;
  });
}

export const RenderedGroup: React.FC<{
  group: FormGroup<any>;
}> = ({ group }) => {
  const [visible, setVisible] = useState(group.visible);
  useEffect(() => {
    group.onStateChange(() => setVisible(group.visible));
  });
  return (
    <div
      style={{
        display: visible ? 'display' : 'none'
      }}
    >
      {renderGroup(group)}
    </div>
  );
};
