/**
 * 纠正缩放后偏离中心区域位置
 */
export default function correctSuitablePosition({ x, y, scale, }: {
    x: number;
    y: number;
    scale: number;
}): {
    x: number;
    y: number;
};
