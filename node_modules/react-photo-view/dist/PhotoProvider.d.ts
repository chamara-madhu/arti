import React from 'react';
import { onShowType, addItemType, removeItemType } from './photo-context';
import { dataType, IPhotoProviderBase } from './types';
export interface IPhotoProvider extends IPhotoProviderBase {
    children: React.ReactNode;
}
declare type PhotoProviderState = {
    images: dataType[];
    visible: boolean;
    index: number;
    onShow: onShowType;
    addItem: addItemType;
    removeItem: removeItemType;
};
export default class PhotoProvider extends React.Component<IPhotoProvider, PhotoProviderState> {
    constructor(props: any);
    handleAddItem: addItemType;
    handleRemoveItem: (key: string) => void;
    handleShow: (key: string) => void;
    handleClose: () => void;
    handleIndexChange: (index: number) => void;
    render(): JSX.Element;
}
export {};
