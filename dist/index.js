"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mouseToApplicationTranslation = exports.getSelectionBoundingBox = exports.screenLengthToAbsoluteLength = exports.absoluteLengthToScreenLength = exports.absoluteStateToScreenState = exports.screenStateToAbsoluteState = void 0;
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
const absoluteLengthToScreenLength = (viewportState, length) => {
    return length / viewportState.scale;
};
exports.absoluteLengthToScreenLength = absoluteLengthToScreenLength;
const screenLengthToAbsoluteLength = (viewportState, length) => {
    return length * viewportState.scale;
};
exports.screenLengthToAbsoluteLength = screenLengthToAbsoluteLength;
const getSelectionBoundingBox = (viewportState, selectedContainerStateMap) => {
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;
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
const mouseToApplicationTranslation = (event, viewportState, containerState) => {
    const targetScreenState = absoluteStateToScreenState(viewportState, containerState);
    const pointRelativeToApplication = {
        x: Math.round(viewportState.scale * (event.clientX - targetScreenState.x)),
        y: Math.round(viewportState.scale * (event.clientY - targetScreenState.y))
    };
    return pointRelativeToApplication;
};
exports.mouseToApplicationTranslation = mouseToApplicationTranslation;
