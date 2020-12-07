import React from 'react';
/**
 * 从 Touch 事件中获取两个触控中心位置
 */
export default function getMultipleTouchPosition(evt: React.TouchEvent): {
    clientX: number;
    clientY: number;
    touchLength: number;
};
