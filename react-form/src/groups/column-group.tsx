import React from 'react';
import { GroupFC, IGroup } from '../form';
import './column-group.css';
import { GroupType } from './enum';

export interface ColumnParams {
  columns: number;
}

export const ColumnGroup: GroupFC<ColumnParams> = ({ controls, params }) => {
  const splitedControls = split(controls, params?.columns ?? 2);

  return (
    <div className="column-container">
      {splitedControls.map((sub, index) => (
        <div className="column-item" key={index}>
          {sub}
        </div>
      ))}
    </div>
  );
};

function split<T>(target: T[], step: number) {
  if (step === 1) {
    return target;
  }
  return target
    .map((_, index: number) =>
      index % step === 0
        ? Array.from(Array(step).keys()).map((x: number) => target[index + x])
        : []
    )
    .filter((x: any[]) => x.length > 0) as React.ReactNode[];
}

export const Column: IGroup = {
  id: GroupType.Column,
  component: ColumnGroup
};
