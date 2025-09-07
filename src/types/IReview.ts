import { EState } from 'types'

import { ILike } from './ILike'
import { IUser } from './IUser'

export interface IReview {
    id: string
    anon: boolean
    uid: string
    type: 'revision' | 'error'
    title: string
    description: string
    status: EState
    createdAt: number
    created: string
    updatedAt: number
    updated: string
    parentId: string
    user?: IUser
    comment: IReview[]
    likes: number
    like: boolean
}

export type IReviewsCollectionResponse = {
    data: IReview[]
    meta: {
        count: number
        total: number
        totalPages: number
    }
}

export interface IReviewItemResponse {
    data: IReview
    meta: {
        count: number
        total: number
        totalPages: number
    }
}
