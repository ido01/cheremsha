import { IUser } from './IUser'

export interface IAction {
    id: string
    uid: string
    method: string
    url: string
    query: string
    createdAt: string
    user: IUser
    group?: boolean
    actions?: IAction[]
}

export interface IActionResponse {
    data: IAction[]
    meta: {
        count: number
        total: number
        totalPages: number
    }
}
