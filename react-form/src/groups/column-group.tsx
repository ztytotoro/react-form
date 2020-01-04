import React from 'react';
import { GroupFC, IGroup } from '../form';
import './column-group.css';
import { GroupType } from './enum';
import { usePromise } from '../hooks';

export interface ColumnParams {
    columns: number;
}

export const Group: GroupFC<ColumnParams> = ({ controls, params, label }) => {
    const splitedControls = split(controls, params?.columns ?? 2);
    const [text] = usePromise(label ?? Promise.resolve(null));
    return (
        <div className="ColumnContainer">
            {text ? <span className="ColumnLabel">--{text}--</span> : <></>}
            {splitedControls.map((sub, index) => (
                <div className="ColumnItem" key={index}>
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
                ? Array.from(Array(step).keys()).map(
                      (x: number) => target[index + x]
                  )
                : []
        )
        .filter((x: any[]) => x.length > 0) as React.ReactNode[];
}

export const ColumnGroup: IGroup = {
    id: GroupType.Column,
    component: Group,
};
