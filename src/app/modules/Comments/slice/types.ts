import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IComment } from 'types/IComment'

export interface ICommentRequest {
    oid: string
    type: string
}

export interface ICommentsState extends EntityState<IComment> {
    status: EStatus
    delete: {
        status: EStatus
        open: boolean
        data: IComment
    }
    form: {
        status: EStatus
        open: boolean
        data: IComment
    }
}
