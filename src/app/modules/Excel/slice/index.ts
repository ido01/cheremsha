import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IExcel, IExcelModifyRequest, IExcelRequest } from 'types/IExcel'

import { initExcel } from './constants'
import { IExcelState, IPasteExcel } from './types'

export const excelAdapter = createEntityAdapter<IExcel>()

const slice = createSlice({
    name: 'excel',
    initialState: excelAdapter.getInitialState<IExcelState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        formStatus: EStatus.INITIAL,
        copyId: '',
        moveId: '',
        modal: {
            isOpen: false,
            activeId: '',
            blob: '',
        },
        deleteModal: {
            status: EStatus.INITIAL,
            open: false,
            data: initExcel,
        },
        form: {
            status: EStatus.INITIAL,
            open: false,
            data: initExcel,
            copy: initExcel,
        },
    }),
    reducers: {
        cleanExcel(state) {
            excelAdapter.setAll(state, [])
        },
        loadExcel(state) {
            state.status = EStatus.PENDING
        },
        searchExcel(state, action: PayloadAction<string>) {
            state
            action
        },
        viewExcel(state, action: PayloadAction<string>) {
            state
            action
        },
        setBlob(state, action: PayloadAction<string>) {
            state.modal.blob = action.payload
        },
        excelLoaded(state, action: PayloadAction<IExcel[]>) {
            excelAdapter.setAll(state, action.payload)
            state.status = EStatus.FINISHED
            state.formStatus = EStatus.FINISHED
            state.form.status = EStatus.FINISHED
        },
        excelUpdated(state, action: PayloadAction<IExcel>) {
            excelAdapter.setOne(state, action.payload)
            state.status = EStatus.FINISHED
            state.formStatus = EStatus.FINISHED
            state.form.status = EStatus.FINISHED
            state.form.data = action.payload
            state.form.open = false
        },
        openEditModal(state, action: PayloadAction<IExcel>) {
            state.formStatus = EStatus.INITIAL
            state.form.status = EStatus.INITIAL
            state.form.open = true
            state.form.data = action.payload
        },
        hideEditModal(state) {
            state.form.open = false
        },
        reCreateExcel(state, action: PayloadAction<IExcel>) {
            state
            action
        },
        createExcel(state, action: PayloadAction<IExcelRequest>) {
            state.formStatus = EStatus.PENDING
            action
        },
        updateExcel(state, action: PayloadAction<IExcelRequest>) {
            state.formStatus = EStatus.PENDING
            action
        },
        modifyExcel(state, action: PayloadAction<IExcelModifyRequest>) {
            state.form.status = EStatus.PENDING
            action
        },
        excelSave(state, action: PayloadAction<IExcel>) {
            state.formStatus = EStatus.FINISHED
            state.form.status = EStatus.FINISHED
            state.form.open = false
            excelAdapter.setOne(state, action.payload)
        },
        deleteExcel(state, action: PayloadAction<string>) {
            state.deleteModal.status = EStatus.PENDING
            action.payload
        },
        excelDeleted(state, action: PayloadAction<string>) {
            excelAdapter.removeOne(state, action.payload)
            state.deleteModal.open = false
            state.deleteModal.status = EStatus.FINISHED
        },
        setForm(state, action: PayloadAction<IExcel>) {
            state.formStatus = EStatus.INITIAL
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
            state.formStatus = EStatus.ERROR
            state.form.status = EStatus.ERROR
        },
        showDeleteModal(state, action: PayloadAction<IExcel>) {
            state.deleteModal.open = true
            state.deleteModal.data = action.payload
        },
        closeDeleteModal(state) {
            state.deleteModal.open = false
        },
        cutExcel(state, action: PayloadAction<string>) {
            state.moveId = action.payload
            state.copyId = ''
            state.form.open = false
            state.modal.isOpen = false
        },
        copyExcel(state, action: PayloadAction<IExcel>) {
            state.copyId = action.payload.id
            state.form.copy = action.payload
            state.moveId = ''
            state.form.open = false
            state.modal.isOpen = false
        },
        moveExcel(state, action: PayloadAction<IPasteExcel>) {
            state
            action
        },
    },
})

export const { actions: excelActions, reducer: excelReducer } = slice
