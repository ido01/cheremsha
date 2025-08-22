export interface ILocation {
    id: string
    name: string
    row_name: string
    visible: boolean
    pid: string
}

export interface ILocationsResponse {
    data: ILocation[]
}

export interface ILocationItemResponse {
    data: ILocation
}
