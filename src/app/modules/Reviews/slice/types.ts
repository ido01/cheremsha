import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IReview } from 'types/IReview'
import { TTablePagination } from 'types/ITableDisplay'

export interface IReviewFilter {
    author: 'all' | 'my'
    status: EStatus | 'all'
}

export interface IReviewsState extends EntityState<IReview> {
    status: EStatus
    filter: IReviewFilter
    pagination: TTablePagination
    delete: {
        status: EStatus
        open: boolean
    }
    form: {
        status: EStatus
        open: boolean
        data: IReview
    }
}
