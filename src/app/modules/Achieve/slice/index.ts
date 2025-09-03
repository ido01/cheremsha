import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IAchieve, IAchieveCollectionResponse } from 'types/IAchieve'
import { IFile } from 'types/IFile'

import { IAchieveState } from './types'

export const achieveAdapter = createEntityAdapter<IAchieve>()

const slice = createSlice({
    name: 'achieve',
    initialState: achieveAdapter.getInitialState<IAchieveState>({
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
                icon: '',
                color: '',
                fid: '',
                label: '',
                description: '',
                order_row: 1,
            },
        },
        form: {
            status: EStatus.INITIAL,
            open: false,
            data: {
                id: '',
                icon: '',
                color: '',
                fid: '',
                label: '',
                description: '',
                order_row: 1,
            },
        },
    }),
    reducers: {
        cleanachieve(state) {
            achieveAdapter.setAll(state, [])
        },
        loadAchieve(state) {
            state.status = EStatus.PENDING
        },
        achieveLoaded(state, action: PayloadAction<IAchieveCollectionResponse>) {
            achieveAdapter.setAll(state, action.payload.data)
            state.status = EStatus.FINISHED
        },
        openEditModal(state, action: PayloadAction<IAchieve>) {
            state.form.status = EStatus.INITIAL
            state.form.open = true
            state.form.data = action.payload
        },
        hideEditModal(state) {
            state.form.open = false
        },
        createAchieve(state, action: PayloadAction<IAchieve>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        updateAchieve(state, action: PayloadAction<IAchieve>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        achieveSave(state, action: PayloadAction<IAchieve>) {
            state.form.status = EStatus.FINISHED
            state.form.open = false
            achieveAdapter.setOne(state, action.payload)
        },
        deleteAchieve(state, action: PayloadAction<string>) {
            state.deleteModal.status = EStatus.PENDING
            action.payload
        },
        achieveDeleted(state, action: PayloadAction<string>) {
            achieveAdapter.removeOne(state, action.payload)
            state.deleteModal.open = false
            state.deleteModal.status = EStatus.FINISHED
        },
        setForm(state, action: PayloadAction<IAchieve>) {
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
        showDeleteModal(state, action: PayloadAction<IAchieve>) {
            state.deleteModal.open = true
            state.deleteModal.data = action.payload
        },
        closeDeleteModal(state) {
            state.deleteModal.open = false
        },
        updateImage(state, action: PayloadAction<IFile>) {
            state.form.data.fid = action.payload.id
            state.form.data.image = action.payload
        },
    },
})

export const { actions: achieveActions, reducer: achieveReducer } = slice
