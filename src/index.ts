
export type ContainerState = {
    x: number;
    y: number;
    width: number;
    height: number;
    scale: number;
}
export type ScreenState = {
    x: number;
    y: number;
    width: number;
    height: number;
}
export type ViewportState = {
    x: number;
    y: number;
    scale: number;
}
export type Point = {
    x: number;
    y: number;
}
type InputStateXY = {
    x: number;
    y: number;
}

type InputStateWH = {
    width: number;
    height: number;
}
export function screenStateToAbsoluteState(viewportState: ViewportState, state: InputStateXY&InputStateWH): { x:number, y: number, width: number, height: number }
export function screenStateToAbsoluteState(viewportState: ViewportState, state: InputStateXY): { x: number, y: number };
export function screenStateToAbsoluteState(viewportState: ViewportState, state: InputStateWH): { width: number, height: number };
export function screenStateToAbsoluteState(viewportState: ViewportState, state: Partial<ContainerState>): Partial<ContainerState>;

export function screenStateToAbsoluteState(viewportState: ViewportState, state: Partial<ContainerState>): Partial<ContainerState> {
    return {
        x: (state.x !== undefined) ? (viewportState.scale * state.x) - viewportState.x : undefined,
        y: (state.y !== undefined) ? (viewportState.scale * state.y) - viewportState.y : undefined,
        width: (state.width !== undefined) ? viewportState.scale * state.width : undefined,
        height: (state.height !== undefined) ? viewportState.scale * state.height : undefined,
    };
}

export function absoluteStateToScreenState(viewportState: ViewportState, state: InputStateXY&InputStateWH): { x:number, y: number, width: number, height: number }
export function absoluteStateToScreenState(viewportState: ViewportState, state: InputStateXY): { x: number, y: number };
export function absoluteStateToScreenState(viewportState: ViewportState, state: InputStateWH): { width: number, height: number };
export function absoluteStateToScreenState(viewportState: ViewportState, state: Partial<ContainerState>): Partial<ContainerState>;

export function absoluteStateToScreenState(viewportState: ViewportState, state: Partial<ContainerState>): Partial<ContainerState> {
    return {
        x: (state.x !== undefined) ? (state.x + viewportState.x) / viewportState.scale : undefined,
        y: (state.y !== undefined) ? (state.y + viewportState.y) / viewportState.scale : undefined,
        width: (state.width !== undefined) ? state.width / viewportState.scale : undefined,
        height: (state.height !== undefined) ? state.height / viewportState.scale : undefined,
    };
}


export const getSelectionBoundingBox = (viewportState: ViewportState, selectedContainerStateMap: Map<string, ContainerState>): ScreenState => {
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
        x: 1/viewportState.scale * (minX + viewportState.x),
        y: 1/viewportState.scale * (minY + viewportState.y),
        width: 1/viewportState.scale * (maxX - minX),
        height: 1/viewportState.scale * (maxY - minY),
    };
}