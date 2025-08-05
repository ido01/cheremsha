export interface ITime {
    hour: number
    minute: number
}

export interface ITableTime {
    id: string
    tid: string
    name: string
    start: ITime
    end: ITime
}

export interface ITable {
    id: string
    name: string
    places: number
    reservations: ITableTime[]
}

export interface IMinLine {
    height: string
    left: string
}
