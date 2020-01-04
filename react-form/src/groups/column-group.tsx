import React from 'react';
import { GroupFC, IGroup } from '../form';
import './column-group.css';
import { GroupType } from './enum';
import { PromisedText } from '../components';

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
                    {sub.map((node, index) => (
                        <div key={index} className="Column">
                            {node}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

function split<T>(target: T[], step: number) {
    return target
        .map((_, index: number) =>
            index % step === 0
                ? Array.from(Array(step).keys()).map(
                      (x: number) => target[index + x]
                  )
                : []
        )
        .filter((x: any[]) => x.length > 0);
}

export const ColumnGroup: IGroup = {
    id: GroupType.Column,
    component: Group,
};
