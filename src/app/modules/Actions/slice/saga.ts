import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, select, takeLeading } from 'redux-saga/effects'
import { IActionResponse } from 'types/IAction'
import { TTableOrder, TTablePagination } from 'types/ITableDisplay'
import { request } from 'utils/request'

import { actionsActions } from '.'
import { selectFilter, selectFilterUser, selectOrder, selectPagination, selectPaginationUser } from './selectors'
import { IActionFilter } from './types'

export function* loadActions() {
    try {
        const pagination: TTablePagination = yield select(selectPagination)
        const order: TTableOrder = yield select(selectOrder)
        const filter: IActionFilter = yield select(selectFilter)

        const response: IActionResponse = yield call(request, `actions`, {
            params: {
                page: pagination.page,
                limit: pagination.limit,
                order: order.order,
                orderRow: order.row,
                method: filter.method,
                query: filter.query,
            },
        })

        yield put(actionsActions.actionsLoaded(response))
    } catch (error: any) {
        yield put(actionsActions.statusError())
    }
}

export function* loadUserActions(action: PayloadAction<string>) {
    try {
        const pagination: TTablePagination = yield select(selectPaginationUser)
        const filter: IActionFilter = yield select(selectFilterUser)

        const response: IActionResponse = yield call(request, `actions`, {
            params: {
                page: pagination.page,
                limit: pagination.limit,
                method: filter.method,
                query: filter.query,
                uid: action.payload,
            },
        })

        yield put(actionsActions.userActionsLoaded(response))
    } catch (error: any) {
        yield put(actionsActions.statusError())
    }
}

export function* actionsWatcher() {
    yield takeLeading(actionsActions.loadActions.type, loadActions)
    yield takeLeading(actionsActions.loadUserActions.type, loadUserActions)
}
