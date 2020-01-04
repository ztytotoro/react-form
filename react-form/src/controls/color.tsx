import React, { useState } from 'react';
import { ControlFC, IControl } from '../form';
import { SketchPicker, ColorResult } from 'react-color';
import { ControlType } from './enum';
import { Popover } from 'antd';
import './color.css';

const ColorBlock: React.FC<{
    color: string;
    size?: number;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ color, size = 25, onClick, disabled }) => (
    <button
        className="ColorBlock"
        style={{
            backgroundColor: color,
            height: size,
            width: size,
        }}
        onClick={onClick}
        disabled={disabled}
    ></button>
);

const Control: ControlFC<string> = ({ value, disabled, onChange }) => {
    const [color, setColor] = useState(value);
    const colorChange = (color: ColorResult) => {
        onChange(color.hex);
        setColor(color.hex);
    };
    const [visible, setVisible] = useState(false);
    return (
        <Popover
            overlayClassName="ColorPopover"
            content={
                <div className="ColorWraper">
                    <SketchPicker
                        color={color}
                        onChange={colorChange}
                    ></SketchPicker>
                </div>
            }
            trigger="click"
            visible={visible}
            onVisibleChange={setVisible}
            placement="bottomLeft"
        >
            <ColorBlock
                color={color}
                size={25}
                disabled={disabled}
            ></ColorBlock>
        </Popover>
    );
};

export const ColorrControl: IControl = {
    id: ControlType.Color,
    component: Control,
};
