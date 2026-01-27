import { ERole } from 'types'

import { IUser } from './IUser'

export interface IHand {
    id: string
    key_name: string
    description: string
    role: ERole
    user_count: number
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
    user?: IUser
}

export type IHandUserCollectionResponse = {
    data: IHandUser[]
}

export interface IHandUserItemResponse {
    data: IHandUser
}

export interface IAcecssInterface {
    access_view_id: string
    access_update_id: string
    access_view: IHand
    access_update: IHand
}
