import { EStatus } from 'types'

import { IUser } from './IUser'

export interface IDocumentTaskUser {
    id: string
    document_id: string
    user_id: string
    status: EStatus
    endAt: string
    user?: IUser
    name?: string
}
