/**
 * 获取移动或缩放之后的中心点
 */
export default function getPositionOnMoveOrScale({ x, y, clientX, clientY, offsetX, offsetY, fromScale, toScale, }: {
    x: number;
    y: number;
    clientX: number;
    clientY: number;
    offsetX?: number;
    offsetY?: number;
    fromScale: number;
    toScale: number;
}): {
    x: number;
    y: number;
    scale: number;
    lastMoveClientX: number;
    lastMoveClientY: number;
};
