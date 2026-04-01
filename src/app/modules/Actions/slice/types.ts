import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IAction } from 'types/IAction'
import { TTableOrder, TTablePagination } from 'types/ITableDisplay'

export interface IActionFilter {
    method: string
    query: string
}

export interface IActionsState extends EntityState<IAction> {
    status: EStatus
    statusUser: EStatus
    order: TTableOrder
    total_count: number
    pagination: TTablePagination
    filter: IActionFilter
    paginationUser: TTablePagination
    filterUser: IActionFilter
    userActions: IAction[]
}
