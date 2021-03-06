import React from 'react';
import './column.css';
import { GroupType } from './enum';
import { GroupFC, PromisedText, IGroup } from 'react-formq';

export interface ColumnParams {
  columns: number;
}

export const Group: GroupFC<ColumnParams> = ({ controls, params, label }) => {
  const splitedControls = split(controls, params?.columns ?? 2);
  return (
    <div className="ColumnContainer">
      <PromisedText textPromise={label}></PromisedText>
      {splitedControls.map((sub, index) => (
        <div className="Row" key={index}>
          {sub.map((node, index) =>
            node ? (
              <div key={index} className="Column">
                {node.element}
              </div>
            ) : (
              <></>
            )
          )}
        </div>
      ))}
    </div>
  );
};

function split<T>(target: T[], step: number) {
  return target
    .map((_, index: number) =>
      index % step === 0
        ? Array.from(Array(step).keys())
            .map((x: number) => target[index + x])
            .filter(x => x !== undefined)
        : []
    )
    .filter((x: any[]) => x.length > 0);
}

export const ColumnGroup: IGroup = {
  id: GroupType.Column,
  component: Group
};
