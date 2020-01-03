import { Validator } from '../validator';

export const ColorValidator: Validator<string> = value => {
  if (value === 'red' || value === 'black') return null;
  return Promise.resolve('颜色值不合法');
};
