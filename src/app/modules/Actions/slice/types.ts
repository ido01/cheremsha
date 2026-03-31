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
    order: TTableOrder
    total_count: number
    pagination: TTablePagination
    filter: IActionFilter
}
