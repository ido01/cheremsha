import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IPollQuestion, IPollsResponse } from 'types/IPoll'

import { IPollsState } from './types'

export const pollsAdapter = createEntityAdapter<IPollQuestion>()

const slice = createSlice({
    name: 'polls',
    initialState: pollsAdapter.getInitialState<IPollsState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        title: '',
        count: 0,
    }),
    reducers: {
        loadPolls(state) {
            state.status = EStatus.PENDING
        },
        reloadPolls(state) {
            state.status = EStatus.PENDING
        },
        pollsLoaded(state, action: PayloadAction<IPollsResponse>) {
            pollsAdapter.setAll(state, action.payload.questions)
            state.title = action.payload.title
            state.count = action.payload.count
            state.status = EStatus.FINISHED
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },
    },
})

export const { actions: pollsActions, reducer: pollsReducer } = slice
