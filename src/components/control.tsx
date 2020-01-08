import React, { useState, useEffect } from 'react';
import { FormControl } from '../form';
import './control.css';
import { PromisedText } from './text';
import { getControl } from '../base';

export const RenderedControl: React.FC<{
  control: FormControl<any>;
}> = ({ control }) => {
  const Control = getControl(control.definition.type);
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
      if (value !== control.value) {
        control.setValue(value);
      }
    };
    return (
      <div className="FormControl">
        <label className="FormControlLabel">
          <PromisedText textPromise={control.definition.label}></PromisedText>
        </label>
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
      </div>
    );
  }
  console.warn('Cannot find control: ', control.definition.type);
  return <></>;
};
