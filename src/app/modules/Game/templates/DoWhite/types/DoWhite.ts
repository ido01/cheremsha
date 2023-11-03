export enum EWay {
    UP = 'up',
    RIGHT = 'right',
    DOWN = 'down',
    LEFT = 'left',
}

export type TCoord = {
    x: number
    y: number
}

export type TColor = {
    r: number
    g: number
    b: number
}

export interface IColorBlock {
    id: string
    preyId: string
    currentPosition: TCoord
    nextPosition: TCoord
    pixelPosition: TCoord
    color: TColor
    diffColor: TColor
    stepColor: TColor
    finalSteps: number
    die: boolean
    bingo: boolean
}
