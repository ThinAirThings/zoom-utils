// src/index.ts
function screenStateToAbsoluteState(viewportState, state) {
  return {
    ...state.x !== void 0 && { x: viewportState.scale * state.x - viewportState.x },
    ...state.y !== void 0 && { y: viewportState.scale * state.y - viewportState.y },
    ...state.width !== void 0 && { width: viewportState.scale * state.width },
    ...state.height !== void 0 && { height: viewportState.scale * state.height }
  };
}
function absoluteStateToScreenState(viewportState, state) {
  return {
    ...state.x !== void 0 && { x: (state.x + viewportState.x) / viewportState.scale },
    ...state.y !== void 0 && { y: (state.y + viewportState.y) / viewportState.scale },
    ...state.width !== void 0 && { width: state.width / viewportState.scale },
    ...state.height !== void 0 && { height: state.height / viewportState.scale }
  };
}
var absoluteLengthToScreenLength = (viewportState, length) => {
  return length / viewportState.scale;
};
var screenLengthToAbsoluteLength = (viewportState, length) => {
  return length * viewportState.scale;
};
var getSelectionBoundingBox = (viewportState, selectedContainerStatesSet) => {
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;
  selectedContainerStatesSet.forEach((containerState) => {
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
    height: 1 / viewportState.scale * (maxY - minY)
  };
};
var mouseEventToApplicationTranslation = (event, viewportState, containerState) => {
  const targetScreenState = absoluteStateToScreenState(viewportState, containerState);
  const pointRelativeToApplication = {
    x: Math.round(1 / containerState.scale * viewportState.scale * (event.clientX - targetScreenState.x)),
    y: Math.round(1 / containerState.scale * viewportState.scale * (event.clientY - targetScreenState.y))
  };
  return pointRelativeToApplication;
};
var absoluteContainerStateToRelativeDimensions = (containerState) => {
  return {
    width: 1 / containerState.scale * containerState.width,
    height: 1 / containerState.scale * containerState.height
  };
};
var relativeDimensionsToAbsoluteDimensions = (containerState, dimensions) => {
  return {
    width: containerState.scale * dimensions.width,
    height: containerState.scale * dimensions.height
  };
};
var ptDistance = (p1, p2) => {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};
export {
  absoluteContainerStateToRelativeDimensions,
  absoluteLengthToScreenLength,
  absoluteStateToScreenState,
  getSelectionBoundingBox,
  mouseEventToApplicationTranslation,
  ptDistance,
  relativeDimensionsToAbsoluteDimensions,
  screenLengthToAbsoluteLength,
  screenStateToAbsoluteState
};
//# sourceMappingURL=index.mjs.map