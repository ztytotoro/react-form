import React, { useEffect } from 'react';
import {
    FormGroup,
    FormControl,
    FormItemKind,
    getGroup,
    ControlList,
} from '../form';
import { RenderedControl } from './control';
import { useState } from 'react';

export function renderGroup(group: FormGroup<any>): ControlList {
    return group.controlList.map((control, index) => {
        if (control.kind === FormItemKind.Control) {
            return (
                <RenderedControl
                    key={control.name}
                    control={control as FormControl<any>}
                ></RenderedControl>
            );
        }
        if (control.kind === FormItemKind.Group) {
            return (
                <RenderedGroup
                    key={control.name ?? index}
                    group={control as FormGroup<any>}
                ></RenderedGroup>
            );
        }
        return <></>;
    });
}

export const RenderedGroup: React.FC<{
    group: FormGroup<any>;
}> = ({ group }) => {
    const [visible, setVisible] = useState(group.visible);
    useEffect(() => {
        group.onStateChange(() => setVisible(group.visible));
    });
    const Group = getGroup(group.definition.type);

    if (Group) {
        return (
            <Group
                controls={renderGroup(group)}
                visible={visible}
                params={group.definition.params}
                label={group.definition.label}
            ></Group>
        );
    }

    console.warn('Cannot find group: ', group.definition.type);
    return <></>;
};
