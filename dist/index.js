"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mouseEventToApplicationTranslation = exports.getSelectionBoundingBox = exports.screenLengthToAbsoluteLength = exports.absoluteLengthToScreenLength = exports.absoluteStateToScreenState = exports.screenStateToAbsoluteState = void 0;
function screenStateToAbsoluteState(viewportState, state) {
    return {
        ...(state.x !== undefined && { x: (viewportState.scale * state.x) - viewportState.x }),
        ...(state.y !== undefined && { y: (viewportState.scale * state.y) - viewportState.y }),
        ...(state.width !== undefined && { width: viewportState.scale * state.width }),
        ...(state.height !== undefined && { height: viewportState.scale * state.height })
    };
}
exports.screenStateToAbsoluteState = screenStateToAbsoluteState;
function absoluteStateToScreenState(viewportState, state) {
    return {
        ...(state.x !== undefined && { x: (state.x + viewportState.x) / viewportState.scale }),
        ...(state.y !== undefined && { y: (state.y + viewportState.y) / viewportState.scale }),
        ...(state.width !== undefined && { width: state.width / viewportState.scale }),
        ...(state.height !== undefined && { height: state.height / viewportState.scale })
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
const mouseEventToApplicationTranslation = (event, viewportState, containerState) => {
    const targetScreenState = absoluteStateToScreenState(viewportState, containerState);
    const pointRelativeToApplication = {
        x: Math.round(1 / containerState.scale * viewportState.scale * (event.clientX - targetScreenState.x)),
        y: Math.round(1 / containerState.scale * viewportState.scale * (event.clientY - targetScreenState.y))
    };
    return pointRelativeToApplication;
};
exports.mouseEventToApplicationTranslation = mouseEventToApplicationTranslation;
