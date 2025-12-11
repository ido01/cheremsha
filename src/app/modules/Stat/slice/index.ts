import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IStat, IStatsCollectionResponse } from 'types/IStat'

import { IStatState } from './types'

export const statsAdapter = createEntityAdapter<IStat>()

const slice = createSlice({
    name: 'stats',
    initialState: statsAdapter.getInitialState<IStatState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
    }),
    reducers: {
        loadStat(state) {
            state.status = EStatus.PENDING
        },
        statLoaded(state, action: PayloadAction<IStatsCollectionResponse>) {
            statsAdapter.setAll(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },
    },
})

export const { actions: statsActions, reducer: statsReducer } = slice
