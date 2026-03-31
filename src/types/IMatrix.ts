import { IUser } from './IUser'

export interface IMatrixUserRequest {
    parent_id: string
    uid: string
}

export interface IMatrixUser {
    id: string
    parent_id: string
    uid: string
    user?: IUser
}

export interface IMatrixBlock {
    id: string
    mid: string
    author_id: string
    status: string
    author?: IUser
}

export interface IMatrix {
    id: string
    parentId: string
    position: number
    name: string
    author_id: string
    empty: boolean
    author?: IUser
    blocks: IMatrixBlock[]
}

export interface IMatrixCollectionResponse {
    data: IMatrix[]
}

export interface IMatrixItemResponse {
    data: IMatrix
}

export interface IMatrixPositionFindResponse {
    position: number
}
