export declare type TapFuncType<T> = (...args: T[]) => void;
/**
 * 单击和双击事件处理
 * @param singleTap - 单击事件
 * @param doubleTap - 双击事件
 * @return invokeTap
 */
export default function withContinuousTap<T>(singleTap: TapFuncType<T>, doubleTap: TapFuncType<T>): TapFuncType<T>;
