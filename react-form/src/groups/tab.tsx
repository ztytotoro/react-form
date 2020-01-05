import React from 'react';
import { GroupFC, IGroup } from '../form';
import { Tabs } from 'antd';
import { PromisedText } from '../components';
import { GroupType } from './enum';

const { TabPane } = Tabs;

export interface TabParams {
    groups: {
        name: string;
        label: Promise<string>;
    }[];
}

export interface TabItemParams {
    group: string;
}

export const Group: GroupFC<TabParams, TabItemParams> = ({
    controls,
    params,
}) => {
    const tabs = params?.groups.map(group => {
        return {
            ...group,
            controls: controls
                .filter(control => control.groupParams?.group === group.name)
                .map(control => control.element),
        };
    });
    return (
        <Tabs type="card">
            {tabs?.map(tab => (
                <TabPane
                    tab={<PromisedText textPromise={tab.label}></PromisedText>}
                    key={tab.name}
                >
                    {tab.controls}
                </TabPane>
            ))}
        </Tabs>
    );
};

export const TabGroup: IGroup = {
    id: GroupType.Tab,
    component: Group,
};
