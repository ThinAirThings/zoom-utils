export type ContainerState = {
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
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
export {};
