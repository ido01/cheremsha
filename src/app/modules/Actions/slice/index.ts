import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IAction, IActionResponse } from 'types/IAction'
import { TLimit, TTableOrder } from 'types/ITableDisplay'

import { IActionFilter, IActionsState } from './types'

export const actionsAdapter = createEntityAdapter<IAction>()

const slice = createSlice({
    name: 'actions',
    initialState: actionsAdapter.getInitialState<IActionsState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        total_count: 0,
        order: {
            row: 'createdAt',
            order: 'desc',
        },
        pagination: {
            limit: 25,
            page: 1,
            total_pages: 0,
        },
        filter: {
            method: '',
            query: '',
        },
    }),
    reducers: {
        cleanActions(state) {
            actionsAdapter.setAll(state, [])
            state.pagination.page = 1
            state.pagination.total_pages = 1
            state.total_count = 0
        },
        setFilter(state, action: PayloadAction<IActionFilter>) {
            state.filter = action.payload
        },
        loadActions(state) {
            state.status = EStatus.PENDING
        },
        actionsLoaded(state, action: PayloadAction<IActionResponse>) {
            actionsAdapter.setAll(state, action.payload.data)
            state.pagination.total_pages = action.payload.meta.totalPages
            state.total_count = action.payload.meta.total
            state.status = EStatus.FINISHED
        },
        setOrder(state, action: PayloadAction<TTableOrder>) {
            state.order = action.payload
        },
        setLimit(state, action: PayloadAction<TLimit>) {
            state.pagination.page = 1
            state.pagination.limit = action.payload
        },
        setPage(state, action: PayloadAction<number>) {
            state.pagination.page = action.payload
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },
    },
})

export const { actions: actionsActions, reducer: actionsReducer } = slice
