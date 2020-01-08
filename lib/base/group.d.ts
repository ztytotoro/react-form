/// <reference types="react" />
import { GroupFC } from '../form/definition';
export declare const registerGroup: (key: string | string[], value: import("react").FC<import("../form/definition").GroupProps<any, any>>) => void, getGroup: (key?: string | undefined) => import("react").FC<import("../form/definition").GroupProps<any, any>> | null;
export declare function useGroups(groups: {
    id: string;
    component: GroupFC<any>;
}[]): void;
