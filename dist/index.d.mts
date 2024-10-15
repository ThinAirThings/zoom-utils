type ContainerState = {
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
};
type ScreenState = {
    x: number;
    y: number;
    width: number;
    height: number;
};
type ViewportState = {
    x: number;
    y: number;
    scale: number;
};
type Point = {
    x: number;
    y: number;
};
type InputStateXY = {
    x: number;
    y: number;
};
type InputStateWH = {
    width: number;
    height: number;
};
declare function screenStateToAbsoluteState(viewportState: ViewportState, state: InputStateXY & InputStateWH): {
    x: number;
    y: number;
    width: number;
    height: number;
};
declare function screenStateToAbsoluteState(viewportState: ViewportState, state: InputStateXY): {
    x: number;
    y: number;
};
declare function screenStateToAbsoluteState(viewportState: ViewportState, state: InputStateWH): {
    width: number;
    height: number;
};
declare function screenStateToAbsoluteState(viewportState: ViewportState, state: Partial<ContainerState>): Partial<ContainerState>;
declare function absoluteStateToScreenState(viewportState: ViewportState, state: InputStateXY & InputStateWH): {
    x: number;
    y: number;
    width: number;
    height: number;
};
declare function absoluteStateToScreenState(viewportState: ViewportState, state: InputStateXY): {
    x: number;
    y: number;
};
declare function absoluteStateToScreenState(viewportState: ViewportState, state: InputStateWH): {
    width: number;
    height: number;
};
declare function absoluteStateToScreenState(viewportState: ViewportState, state: Partial<ContainerState>): Partial<ContainerState>;
declare const absoluteLengthToScreenLength: (viewportState: ViewportState, length: number) => number;
declare const screenLengthToAbsoluteLength: (viewportState: ViewportState, length: number) => number;
declare const getSelectionBoundingBox: (viewportState: ViewportState, selectedContainerStatesSet: ContainerState[]) => ScreenState;
declare const mouseEventToApplicationTranslation: (event: PointerEvent | WheelEvent, viewportState: ViewportState, containerState: ContainerState) => {
    x: number;
    y: number;
};
declare const absoluteContainerStateToRelativeDimensions: (containerState: ContainerState) => {
    width: number;
    height: number;
};
declare const relativeDimensionsToAbsoluteDimensions: (containerState: ContainerState, dimensions: InputStateWH) => {
    width: number;
    height: number;
};
declare const ptDistance: (p1: Point, p2: Point) => number;

export { type ContainerState, type Point, type ScreenState, type ViewportState, absoluteContainerStateToRelativeDimensions, absoluteLengthToScreenLength, absoluteStateToScreenState, getSelectionBoundingBox, mouseEventToApplicationTranslation, ptDistance, relativeDimensionsToAbsoluteDimensions, screenLengthToAbsoluteLength, screenStateToAbsoluteState };
