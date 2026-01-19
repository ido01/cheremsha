export interface IHand {
    id: string
    key_name: string
    description: string
    role: string
}

export type IHandsCollectionResponse = {
    data: IHand[]
}

export interface IHandItemResponse {
    data: IHand
}

export interface IHandUser {
    id: string
    uid: string
    hid: string
    hand: IHand
}

export type IHandUserCollectionResponse = {
    data: IHandUser[]
}

export interface IHandUserItemResponse {
    data: IHandUser
}
