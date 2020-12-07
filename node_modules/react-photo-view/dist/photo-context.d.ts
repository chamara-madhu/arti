import React from 'react';
import { dataType } from './types';
export declare type onShowType = (key?: string) => void;
export declare type addItemType = ({ key, src, originRef, intro }: dataType) => void;
export declare type removeItemType = (key?: string) => void;
export interface PhotoContextType {
    onShow: onShowType;
    addItem: addItemType;
    removeItem: removeItemType;
}
declare const _default: React.Context<PhotoContextType>;
export default _default;
