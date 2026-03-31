import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IDocument } from 'types/IDocument'
import { TTableOrder, TTablePagination } from 'types/ITableDisplay'
import { IUser } from 'types/IUser'

export interface IResultFilter {
    position_id: string
    place_id: string
    query: string
    state: string
}

export interface IDocumentResultsState extends EntityState<IUser> {
    status: EStatus
    completedLoading: boolean
    closedLoading: boolean
    rejectedLoading: boolean
    acceptLoading: boolean
    declineLoading: boolean
    active_question_id: string
    order: TTableOrder
    total_count: number
    old_total_count: number
    pagination: TTablePagination
    filter: IResultFilter
    status_quiz: EStatus
    document?: IDocument
    modal: {
        isOpen: boolean
        activeId: string
    }
}
