import { Validator } from 'react-formq';

export const ColorValidator: Validator<string> = value => {
  if (value === 'red' || value === 'black') return null;
  return Promise.resolve('颜色值不合法');
};
