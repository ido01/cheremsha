import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IPosition, IPositionsCollectionResponse } from 'types/IPosition'

import { IPositionsState } from './types'

export const positionsAdapter = createEntityAdapter<IPosition>()

const slice = createSlice({
    name: 'positions',
    initialState: positionsAdapter.getInitialState<IPositionsState>({
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
            data: {
                id: '',
                label: '',
            },
        },
        form: {
            status: EStatus.INITIAL,
            open: false,
            data: {
                id: '',
                label: '',
            },
        },
    }),
    reducers: {
        cleanPositions(state) {
            positionsAdapter.setAll(state, [])
        },
        loadPositions(state) {
            state.status = EStatus.PENDING
        },
        positionsLoaded(state, action: PayloadAction<IPositionsCollectionResponse>) {
            positionsAdapter.setAll(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        openEditModal(state, action: PayloadAction<IPosition>) {
            state.form.status = EStatus.INITIAL
            state.form.open = true
            state.form.data = action.payload
        },
        hideEditModal(state) {
            state.form.open = false
        },
        createPosition(state, action: PayloadAction<IPosition>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        updatePosition(state, action: PayloadAction<IPosition>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        positionSave(state, action: PayloadAction<IPosition>) {
            state.form.status = EStatus.FINISHED
            state.form.open = false
            positionsAdapter.setOne(state, action.payload)
        },
        deletePosition(state, action: PayloadAction<string>) {
            state.deleteModal.status = EStatus.PENDING
            action.payload
        },
        positionDeleted(state, action: PayloadAction<string>) {
            positionsAdapter.removeOne(state, action.payload)
            state.deleteModal.open = false
            state.deleteModal.status = EStatus.FINISHED
        },
        setForm(state, action: PayloadAction<IPosition>) {
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
        showDeleteModal(state, action: PayloadAction<IPosition>) {
            state.deleteModal.open = true
            state.deleteModal.data = action.payload
        },
        closeDeleteModal(state) {
            state.deleteModal.open = false
        },
    },
})

export const { actions: positionsActions, reducer: positionsReducer } = slice
