import { IUser } from './IUser'

export interface IComment {
    id: string
    type: string
    uid: string
    oid: string
    text: string
    created_at: number
    updated_at: number
    createdAt: string
    updatedAt: string
    author?: IUser
}

export interface ICommentsResponse {
    data: IComment[]
}
