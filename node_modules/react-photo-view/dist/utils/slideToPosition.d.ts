/**
 * 适应到合适的图片偏移量
 */
export default function slideToPosition({ x, y, lastX, lastY, width, height, scale, rotate, touchedTime, }: {
    x: number;
    y: number;
    lastX: number;
    lastY: number;
    width: number;
    height: number;
    scale: number;
    rotate: number;
    touchedTime: number;
}): {
    x: number;
    y: number;
};
