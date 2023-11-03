import { IGame } from 'types/IGame'

export type TCoord = {
    x: number
    y: number
}

export enum ESpaceStatus {
    INIT = 'init',
    GAME = 'game',
    PAUSE = 'pause',
}

export interface IGameResponse {
    data: IGame
    from: IPlanetResponse | null
    planet: IPlanetResponse
}

export interface ISpaceSize {
    start: TCoord
    end: TCoord
}

export type TLine = {
    k: number
    b: number
    point1: TCoord
    point2: TCoord
}

export interface IPointSpace {
    point: TCoord
    radius: number
    angle: number
}

export interface IVisibleSpaceSize {
    min: TCoord
    max: TCoord
    points: IPointSpace[]
    lines: TLine[]
}

export interface IRocket {
    up: TCoord
    left: TCoord
    right: TCoord
    center: TCoord
    visible: number
    shield: number
    fullShield: number
}

export interface IHelp {
    coord: TCoord
    visible: boolean
}

export interface IStar {
    center: TCoord
}

export interface ISoneShell {
    vertex: TCoord[]
    lines: TLine[]
    sprite: HTMLCanvasElement
}

export interface IStone {
    center: TCoord
    index: number
    speed: TCoord
    active: boolean
    visible: boolean
}

export interface IPlanetResponse {
    id: string
    img: string
    start: number
    coefficient: number
    fullPoints: number
    name: string
    finish_name: string
    description: string
    next_id: string
}

export interface IPlanet extends IPlanetResponse {
    center: TCoord
    angle: number
    visible: boolean
    radius: number
}
