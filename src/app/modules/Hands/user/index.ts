import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IHandUser, IHandUserCollectionResponse } from 'types/IHand'

import { initHand } from './constants'
import { IHandUserState } from './types'

export const handuserAdapter = createEntityAdapter<IHandUser>()

const slice = createSlice({
    name: 'handUser',
    initialState: handuserAdapter.getInitialState<IHandUserState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        deleteModal: {
            status: EStatus.INITIAL,
            open: false,
            data: initHand,
        },
        form: {
            status: EStatus.INITIAL,
            open: false,
            data: initHand,
        },
    }),
    reducers: {
        cleanHands(state) {
            handuserAdapter.setAll(state, [])
        },
        loadHands(state, action: PayloadAction<string>) {
            state.status = EStatus.PENDING
            action
        },
        handsLoaded(state, action: PayloadAction<IHandUserCollectionResponse>) {
            handuserAdapter.setAll(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        openEditModal(state, action: PayloadAction<IHandUser>) {
            state.form.status = EStatus.INITIAL
            state.form.open = true
            state.form.data = action.payload
        },
        hideEditModal(state) {
            state.form.open = false
        },
        createHand(state, action: PayloadAction<IHandUser>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        updateHand(state, action: PayloadAction<IHandUser>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        handSave(state, action: PayloadAction<IHandUser>) {
            state.form.status = EStatus.FINISHED
            state.form.open = false
            handuserAdapter.setOne(state, action.payload)
        },
        deleteHand(state, action: PayloadAction<string>) {
            state.deleteModal.status = EStatus.PENDING
            action.payload
        },
        handDeleted(state, action: PayloadAction<string>) {
            handuserAdapter.removeOne(state, action.payload)
            state.deleteModal.open = false
            state.deleteModal.status = EStatus.FINISHED
        },
        setForm(state, action: PayloadAction<IHandUser>) {
            state.form.status = EStatus.INITIAL
            state.form.data = action.payload
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },
        showDeleteModal(state, action: PayloadAction<IHandUser>) {
            state.deleteModal.open = true
            state.deleteModal.data = action.payload
        },
        closeDeleteModal(state) {
            state.deleteModal.open = false
        },
    },
})

export const { actions: handUserActions, reducer: handUserReducer } = slice
