import React, { useState, useEffect } from 'react';
import { usePromise } from '../hooks';
import { FormControl, getControl } from '../form';

export const RenderedControl: React.FC<{
  control: FormControl<any>;
}> = ({ control }) => {
  const Control = getControl(control.definition.type);
  const [text] = usePromise(control.definition.label);
  const [disabled, setDisabled] = useState(control.disabled);
  const [value, setValue] = useState(control.value);
  const [isValid, setIsValid] = useState(control.isValid);
  const [errorTips, setErrorTips] = useState<string[]>([]);
  useEffect(() => {
    control.onStateChange(() => {
      setDisabled(control.disabled);
      setValue(control.value);
      setIsValid(control.isValid);
    });
    control.onError(errorTips => setErrorTips(errorTips));
  });
  if (Control) {
    const onChange = (value: any) => {
      control.setValue(value);
    };
    return (
      <>
        <label>{text}</label>
        <Control
          value={value}
          onChange={onChange}
          params={control.definition.params}
          disabled={disabled}
        ></Control>
        {!isValid ? (
          errorTips.map((tip, index) => <label key={index}>{tip}</label>)
        ) : (
          <></>
        )}
      </>
    );
  }
  console.warn('Cannot find control: ', control.definition.type);
  return <></>;
};
