import React from 'react';
/**
 * 图片 item 类型
 */
export declare type dataType = {
    key?: string;
    src: string;
    originRef?: HTMLElement | null;
    intro?: React.ReactNode;
};
/**
 * brokenElement函数使用参数
 */
export declare type brokenElementDataType = Pick<dataType, 'src' | 'intro'>;
export declare type overlayRenderProps = {
    images: dataType[];
    index: number;
    visible: boolean;
    onClose: (evt?: React.MouseEvent | React.TouchEvent) => void;
    onIndexChange: (photoIndex: number) => void;
    overlayVisible: boolean;
    rotate: number;
    onRotate: (rotate: number) => void;
};
export interface IPhotoProviderBase {
    maskClosable?: boolean;
    photoClosable?: boolean;
    bannerVisible?: boolean;
    introVisible?: boolean;
    overlayRender?: (overlayProps: overlayRenderProps) => React.ReactNode;
    toolbarRender?: (overlayProps: overlayRenderProps) => React.ReactNode;
    className?: string;
    maskClassName?: string;
    viewClassName?: string;
    imageClassName?: string;
    loadingElement?: JSX.Element;
    brokenElement?: JSX.Element | ((photoProps: brokenElementDataType) => JSX.Element);
}
export declare type ReachMoveFunction = (reachState: ReachTypeEnum, clientX: number, clientY: number, scale?: number) => void;
export declare type ReachFunction = (clientX: number, clientY: number) => void;
export declare type PhotoTapFunction = (clientX: number, clientY: number) => void;
/**
 * 边缘超出状态
 */
export declare enum CloseEdgeEnum {
    Normal = 0,
    Small = 1,
    Before = 2,
    After = 3
}
/**
 * 边缘触发状态
 */
export declare enum ReachTypeEnum {
    Normal = 0,
    XReach = 1,
    YReach = 2
}
/**
 * 初始响应状态
 */
export declare enum TouchStartEnum {
    Normal = 0,
    X = 1,
    YPush = 2,
    YPull = 3
}
/**
 * 动画类型
 */
export declare enum ShowAnimateEnum {
    None = 0,
    In = 1,
    Out = 2
}
/**
 * 触发源位置
 */
export declare type OriginRectType = {
    clientX: number;
    clientY: number;
} | undefined;
