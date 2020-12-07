/// <reference types="react" />
import { dataType, OriginRectType, ShowAnimateEnum } from '../types';
interface VisibleHandleProps {
    visible: boolean;
    currentImage?: dataType;
    children: ({ photoVisible, showAnimateType, originRect, onShowAnimateEnd, }: {
        photoVisible: boolean;
        showAnimateType: ShowAnimateEnum;
        originRect: OriginRectType;
        onShowAnimateEnd: () => void;
    }) => JSX.Element | null;
}
export default function VisibleAnimationHandle({ visible, currentImage, children }: VisibleHandleProps): JSX.Element | null;
export {};
