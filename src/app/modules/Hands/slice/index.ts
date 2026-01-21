import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IHand, IHandsCollectionResponse } from 'types/IHand'

import { initHand } from './constants'
import { IHandsState } from './types'

export const handsAdapter = createEntityAdapter<IHand>()

const slice = createSlice({
    name: 'hands',
    initialState: handsAdapter.getInitialState<IHandsState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        modal: {
            isOpen: false,
            activeId: '',
        },
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
            handsAdapter.setAll(state, [])
        },
        loadHands(state) {
            state.status = EStatus.PENDING
        },
        searchHands(state, action: PayloadAction<string>) {
            state
            action
        },
        handsLoaded(state, action: PayloadAction<IHandsCollectionResponse>) {
            handsAdapter.setAll(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        openEditModal(state, action: PayloadAction<IHand>) {
            state.form.status = EStatus.INITIAL
            state.form.open = true
            state.form.data = action.payload
        },
        hideEditModal(state) {
            state.form.open = false
        },
        createHand(state, action: PayloadAction<IHand>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        updateHand(state, action: PayloadAction<IHand>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        handSave(state, action: PayloadAction<IHand>) {
            state.form.status = EStatus.FINISHED
            state.form.open = false
            handsAdapter.setOne(state, action.payload)
        },
        deleteHand(state, action: PayloadAction<string>) {
            state.deleteModal.status = EStatus.PENDING
            action.payload
        },
        handDeleted(state, action: PayloadAction<string>) {
            handsAdapter.removeOne(state, action.payload)
            state.deleteModal.open = false
            state.deleteModal.status = EStatus.FINISHED
        },
        setForm(state, action: PayloadAction<IHand>) {
            state.form.status = EStatus.INITIAL
            state.form.data = action.payload
        },

        setActiveId(state, action: PayloadAction<string>) {
            state.modal.activeId = action.payload
        },
        showModal(state) {
            state.modal.isOpen = true
        },
        hideModal(state) {
            state.modal.isOpen = false
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },
        showDeleteModal(state, action: PayloadAction<IHand>) {
            state.deleteModal.open = true
            state.deleteModal.data = action.payload
        },
        closeDeleteModal(state) {
            state.deleteModal.open = false
        },
    },
})

export const { actions: handsActions, reducer: handsReducer } = slice
