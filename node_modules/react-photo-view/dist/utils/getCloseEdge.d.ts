import { CloseEdgeEnum, ReachTypeEnum, TouchStartEnum } from '../types';
/**
 * 接触左边/上边 或 右边/下边边缘
 * @param position - x/y
 * @param scale
 * @param size - width/height
 * @param innerSize - innerWidth/innerHeight
 * @return CloseEdgeEnum
 */
export declare function getClosedEdge(position: number, scale: number, size: number, innerSize: number): CloseEdgeEnum;
/**
 * 获取接触边缘类型
 * @param initialTouchState
 * @param horizontalCloseEdge
 * @param verticalCloseEdge
 * @param reachState
 */
export declare function getReachType({ initialTouchState, horizontalCloseEdge, verticalCloseEdge, reachState, }: {
    initialTouchState: TouchStartEnum;
    horizontalCloseEdge: CloseEdgeEnum;
    verticalCloseEdge: CloseEdgeEnum;
    reachState: ReachTypeEnum;
}): ReachTypeEnum;
