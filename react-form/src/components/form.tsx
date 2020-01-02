import React, { useState } from 'react';
import { ControlDefinition } from '../form/definition';
import { getComponent } from '../form/form';

const RenderedControl: React.FC<{
  control: ControlDefinition<any>;
  onChange: (value: any) => void;
}> = ({ control, onChange }) => {
  const Control = getComponent(control);

  if (Control) {
    const [text] = usePromise(control.label);
    const [value, setValue] = useState(initValue);
    return (
      <>
        <label>{text}</label>
        <Control
          value={value}
          onChange={newValue => {
            setValue(newValue);
            onChange(newValue);
          }}
        ></Control>
      </>
    );
  }
  return <></>;
};
