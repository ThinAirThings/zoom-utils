export type ContainerState = {
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
};
export type ScreenState = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type ViewportState = {
    x: number;
    y: number;
    scale: number;
};
export type Point = {
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
export declare function screenStateToAbsoluteState(viewportState: ViewportState, state: InputStateXY & InputStateWH): {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare function screenStateToAbsoluteState(viewportState: ViewportState, state: InputStateXY): {
    x: number;
    y: number;
};
export declare function screenStateToAbsoluteState(viewportState: ViewportState, state: InputStateWH): {
    width: number;
    height: number;
};
export declare function screenStateToAbsoluteState(viewportState: ViewportState, state: Partial<ContainerState>): Partial<ContainerState>;
export declare function absoluteStateToScreenState(viewportState: ViewportState, state: InputStateXY & InputStateWH): {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare function absoluteStateToScreenState(viewportState: ViewportState, state: InputStateXY): {
    x: number;
    y: number;
};
export declare function absoluteStateToScreenState(viewportState: ViewportState, state: InputStateWH): {
    width: number;
    height: number;
};
export declare function absoluteStateToScreenState(viewportState: ViewportState, state: Partial<ContainerState>): Partial<ContainerState>;
export declare const absoluteLengthToScreenLength: (viewportState: ViewportState, length: number) => number;
export declare const screenLengthToAbsoluteLength: (viewportState: ViewportState, length: number) => number;
export declare const getSelectionBoundingBox: (viewportState: ViewportState, selectedContainerStatesSet: ContainerState[]) => ScreenState;
export declare const mouseEventToApplicationTranslation: (event: PointerEvent | WheelEvent, viewportState: ViewportState, containerState: ContainerState) => {
    x: number;
    y: number;
};
export declare const absoluteContainerStateToRelativeDimensions: (containerState: ContainerState) => {
    width: number;
    height: number;
};
export declare const relativeDimensionsToAbsoluteDimensions: (containerState: ContainerState, dimensions: InputStateWH) => {
    width: number;
    height: number;
};
export declare const ptDistance: (p1: Point, p2: Point) => number;
export {};
