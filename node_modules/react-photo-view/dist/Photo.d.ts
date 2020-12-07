import React from 'react';
import './Photo.less';
import { brokenElementDataType } from './types';
export interface IPhotoProps extends React.HTMLAttributes<any> {
    src: string;
    intro?: React.ReactNode;
    loaded: boolean;
    broken: boolean;
    width: number;
    height: number;
    rotate: number;
    className?: string;
    onImageLoad: (PhotoParams: any, callback?: Function) => void;
    loadingElement?: JSX.Element;
    brokenElement?: JSX.Element | ((photoProps: brokenElementDataType) => JSX.Element);
}
declare const Photo: React.FC<IPhotoProps>;
export default Photo;
