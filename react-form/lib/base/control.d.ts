/// <reference types="react" />
import { ControlFC } from '../form/definition';
export declare const registerControl: (key: string | string[], value: import("react").FC<import("../form/definition").ControlProps<any, any>>) => void, getControl: (key?: string | undefined) => import("react").FC<import("../form/definition").ControlProps<any, any>> | null;
export declare function useControls(controls: {
    id: string;
    component: ControlFC<any>;
}[]): void;
