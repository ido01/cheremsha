import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IHand, IHandsCollectionResponse } from 'types/IHand'

import { IRoleState } from './types'

export const rolesAdapter = createEntityAdapter<IHand>()

const slice = createSlice({
    name: 'roles',
    initialState: rolesAdapter.getInitialState<IRoleState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
    }),
    reducers: {
        loadRoles(state) {
            state.status = EStatus.PENDING
        },
        rolesLoaded(state, action: PayloadAction<IHandsCollectionResponse>) {
            rolesAdapter.setAll(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },
    },
})

export const { actions: rolesActions, reducer: rolesReducer } = slice
