import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { ITinyUser, ITinyUserCollectionResponse } from 'types/IUser'

import { ITinyUsersState } from './types'

export const tinyUsersAdapter = createEntityAdapter<ITinyUser>()

const slice = createSlice({
    name: 'tinyUsers',
    initialState: tinyUsersAdapter.getInitialState<ITinyUsersState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
    }),
    reducers: {
        loadUsers(state) {
            state.status = EStatus.PENDING
        },
        usersLoaded(state, action: PayloadAction<ITinyUserCollectionResponse>) {
            tinyUsersAdapter.setAll(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },
    },
})

export const { actions: tinyUsersActions, reducer: tinyUsersReducer } = slice
