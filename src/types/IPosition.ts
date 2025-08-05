export interface IPosition {
    id: string
    label: string
}

export type IPositionsCollectionResponse = {
    data: IPosition[]
}

export interface IPositionItemResponse {
    data: IPosition
}
