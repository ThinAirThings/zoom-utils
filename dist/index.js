"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.absoluteStateToScreenState = exports.screenStateToAbsoluteState = void 0;
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
