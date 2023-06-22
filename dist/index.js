"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSelectionBoundingBox = exports.absoluteStateToScreenState = exports.screenStateToAbsoluteState = void 0;
function screenStateToAbsoluteState(viewportState, state) {
    return {
        x: (state.x !== undefined) ? (viewportState.scale * state.x) - viewportState.x : undefined,
        y: (state.y !== undefined) ? (viewportState.scale * state.y) - viewportState.y : undefined,
        width: (state.width !== undefined) ? viewportState.scale * state.width : undefined,
        height: (state.height !== undefined) ? viewportState.scale * state.height : undefined,
    };
}
exports.screenStateToAbsoluteState = screenStateToAbsoluteState;
function absoluteStateToScreenState(viewportState, state) {
    return {
        x: (state.x !== undefined) ? (state.x + viewportState.x) / viewportState.scale : undefined,
        y: (state.y !== undefined) ? (state.y + viewportState.y) / viewportState.scale : undefined,
        width: (state.width !== undefined) ? state.width / viewportState.scale : undefined,
        height: (state.height !== undefined) ? state.height / viewportState.scale : undefined,
    };
}
exports.absoluteStateToScreenState = absoluteStateToScreenState;
const getSelectionBoundingBox = (viewportState, selectedContainerStateMap) => {
    let minX = 0;
    let minY = 0;
    let maxX = 0;
    let maxY = 0;
    selectedContainerStateMap.forEach((containerState) => {
        const { x, y, width, height } = containerState;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + width);
        maxY = Math.max(maxY, y + height);
    });
    return {
        x: 1 / viewportState.scale * (minX + viewportState.x),
        y: 1 / viewportState.scale * (minY + viewportState.y),
        width: 1 / viewportState.scale * (maxX - minX),
        height: 1 / viewportState.scale * (maxY - minY),
    };
};
exports.getSelectionBoundingBox = getSelectionBoundingBox;
