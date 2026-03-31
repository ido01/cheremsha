import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, select, takeLeading } from 'redux-saga/effects'
import { TTableOrder, TTablePagination } from 'types/ITableDisplay'
import { IUsersCollectionResponse } from 'types/IUser'
import { request } from 'utils/request'

import { documentResultsActions } from '.'
import { selectFilter, selectOrder, selectPagination } from './selectors'
import { IResultFilter } from './types'

export function* loadResults(action: PayloadAction<string>) {
    try {
        const pagination: TTablePagination = yield select(selectPagination)
        const order: TTableOrder = yield select(selectOrder)
        const filter: IResultFilter = yield select(selectFilter)

        const response: IUsersCollectionResponse = yield call(request, `documents/${action.payload}/results`, {
            params: {
                page: pagination.page,
                limit: pagination.limit,
                order: order.order,
                orderRow: order.row,
                place_id: filter.place_id,
                position_id: filter.position_id,
                query: filter.query,
                state: filter.state,
            },
        })

        yield put(documentResultsActions.resultsLoaded(response))
    } catch (error: any) {
        yield put(documentResultsActions.statusError())
    }
}

export function* documentResultsWatcher() {
    yield takeLeading(documentResultsActions.loadResults.type, loadResults)
}
