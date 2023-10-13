
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
        ...(state.x !== undefined && { x: (viewportState.scale * state.x) - viewportState.x }),
        ...(state.y !== undefined && { y: (viewportState.scale * state.y) - viewportState.y }),
        ...(state.width !== undefined && { width: viewportState.scale * state.width }),
        ...(state.height !== undefined && { height: viewportState.scale * state.height })
    };
}

export function absoluteStateToScreenState(viewportState: ViewportState, state: InputStateXY&InputStateWH): { x:number, y: number, width: number, height: number }
export function absoluteStateToScreenState(viewportState: ViewportState, state: InputStateXY): { x: number, y: number };
export function absoluteStateToScreenState(viewportState: ViewportState, state: InputStateWH): { width: number, height: number };
export function absoluteStateToScreenState(viewportState: ViewportState, state: Partial<ContainerState>): Partial<ContainerState>;
export function absoluteStateToScreenState(viewportState: ViewportState, state: Partial<ContainerState>): Partial<ContainerState> {
    return {
        ...(state.x !== undefined && { x: (state.x + viewportState.x) / viewportState.scale }),
        ...(state.y !== undefined && { y: (state.y + viewportState.y) / viewportState.scale }),
        ...(state.width !== undefined && { width: state.width / viewportState.scale }),
        ...(state.height !== undefined && { height: state.height / viewportState.scale })
    };
}

export const absoluteLengthToScreenLength = (viewportState: ViewportState, length: number): number => {
    return length / viewportState.scale;
}
export const screenLengthToAbsoluteLength = (viewportState: ViewportState, length: number): number => {
    return length * viewportState.scale;
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

export const mouseEventToApplicationTranslation = (event: PointerEvent | WheelEvent, viewportState: ViewportState, containerState: ContainerState) => {
    const targetScreenState = absoluteStateToScreenState(viewportState, containerState)
    const pointRelativeToApplication = {
        x: Math.round(1/containerState.scale * viewportState.scale * (event.clientX - targetScreenState.x)),
        y: Math.round(1/containerState.scale * viewportState.scale * (event.clientY - targetScreenState.y))
    }
    return pointRelativeToApplication
}


export const absoluteContainerStateToRelativeDimensions = (containerState: ContainerState) => {
    return {
        width: (1/containerState.scale) * containerState.width,
        height: (1/containerState.scale) * containerState.height
    }
}

export const relativeDimensionsToAbsoluteDimensions = (containerState: ContainerState, dimensions: InputStateWH) => {
    return {
        width: containerState.scale * dimensions.width,
        height: containerState.scale * dimensions.height
    }
}


export const ptDistance = (p1: Point, p2: Point) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
}