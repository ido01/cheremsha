import { IFile } from './IFile'

export interface IAchieveUser {
    id: string
    aid: string
    uid: string
    description: string
}

export interface IAchieve {
    id: string
    icon: string
    color: string
    fid: string
    label: string
    description: string
    image?: IFile
    order_row: number
    user?: IAchieveUser
}

export type IAchieveCollectionResponse = {
    data: IAchieve[]
}

export interface IAchieveItemResponse {
    data: IAchieve
}
