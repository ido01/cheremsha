import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IMatrix, IMatrixUserRequest } from 'types/IMatrix'

import { initMatrix } from './constants'
import { IMatrixState } from './types'

export const matrixAdapter = createEntityAdapter<IMatrix>()

const slice = createSlice({
    name: 'matrix',
    initialState: matrixAdapter.getInitialState<IMatrixState>({
        ids: [],
        entities: {},
        status: {
            main: EStatus.INITIAL,
            empty: EStatus.INITIAL,
            stock: EStatus.INITIAL,
            stockAll: EStatus.INITIAL,
            user: EStatus.INITIAL,
            send: EStatus.INITIAL,
        },
        users: {
            isOpen: false,
            activeId: '',
        },
        send: {
            isOpen: false,
            activeId: '',
        },
        find: {
            isOpen: false,
            activeId: '',
        },
        modal: {
            isOpen: false,
            activeId: '',
        },
        deleteModal: {
            status: EStatus.INITIAL,
            open: false,
            data: initMatrix,
        },
        form: {
            status: EStatus.INITIAL,
            find: EStatus.INITIAL,
            open: false,
            data: initMatrix,
        },
    }),
    reducers: {
        cleanMatrix(state) {
            matrixAdapter.setAll(state, [])
        },
        searchMatrix(state, action: PayloadAction<string>) {
            state
            action
        },
        matrixLoaded(state, action: PayloadAction<IMatrix[]>) {
            matrixAdapter.setAll(state, action.payload)
            state.status.main = EStatus.FINISHED
        },
        openSend(state, action: PayloadAction<string>) {
            state.send.isOpen = true
            state.send.activeId = action.payload
        },
        hideSend(state) {
            state.send.isOpen = false
        },
        send(state, action: PayloadAction<string>) {
            state.status.send = EStatus.PENDING
            action
        },
        matrixSend(state) {
            state.status.send = EStatus.FINISHED
        },
        user(state, action: PayloadAction<IMatrixUserRequest>) {
            state.status.user = EStatus.PENDING
            action
        },
        userDelete(state, action: PayloadAction<string>) {
            state
            action
        },
        userDone(state) {
            state.status.user = EStatus.FINISHED
        },
        empty(state, action: PayloadAction<string>) {
            state.status.empty = EStatus.PENDING
            action
        },
        stock(state, action: PayloadAction<string>) {
            state.status.stock = EStatus.PENDING
            action
        },
        stockAll(state, action: PayloadAction<string>) {
            state.status.stockAll = EStatus.PENDING
            action
        },
        openUserModal(state, action: PayloadAction<string>) {
            state.users.isOpen = true
            state.users.activeId = action.payload
        },
        hideUserModal(state) {
            state.users.isOpen = false
        },
        openFindModal(state, action: PayloadAction<string>) {
            state.status.user = EStatus.INITIAL
            state.find.isOpen = true
            state.find.activeId = action.payload
        },
        closeFindModal(state) {
            state.find.isOpen = false
        },
        openEditModal(state, action: PayloadAction<IMatrix>) {
            state.form.status = EStatus.INITIAL
            state.form.open = true
            state.form.data = action.payload
        },
        hideEditModal(state) {
            state.form.open = false
        },
        findPosition(state, action: PayloadAction<string>) {
            state.form.find = EStatus.PENDING
            action
        },
        positionFind(state, action: PayloadAction<number>) {
            state.form.find = EStatus.FINISHED
            state.form.data.position = action.payload
        },
        createMatrix(state, action: PayloadAction<IMatrix>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        updateMatrix(state, action: PayloadAction<IMatrix>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        matrixSave(state, action: PayloadAction<IMatrix>) {
            state.form.status = EStatus.FINISHED
            state.status.empty = EStatus.FINISHED
            state.status.stock = EStatus.FINISHED
            state.form.open = false
            matrixAdapter.setOne(state, action.payload)
        },
        deleteMatrix(state, action: PayloadAction<string>) {
            state.deleteModal.status = EStatus.PENDING
            action.payload
        },
        matrixDeleted(state, action: PayloadAction<string>) {
            matrixAdapter.removeOne(state, action.payload)
            state.deleteModal.open = false
            state.deleteModal.status = EStatus.FINISHED
        },
        setForm(state, action: PayloadAction<IMatrix>) {
            state.form.status = EStatus.INITIAL
            state.form.data = action.payload
        },

        setActiveId(state, action: PayloadAction<string>) {
            state.modal.activeId = action.payload
        },
        showModal(state, action: PayloadAction<string>) {
            state.modal.isOpen = true
            state.modal.activeId = action.payload
        },
        hideModal(state) {
            state.modal.isOpen = false
        },
        statusError(state) {
            state.status.main = EStatus.ERROR
            state.form.status = EStatus.ERROR
        },
        showDeleteModal(state, action: PayloadAction<IMatrix>) {
            state.deleteModal.open = true
            state.deleteModal.data = action.payload
        },
        closeDeleteModal(state) {
            state.deleteModal.open = false
        },
    },
})

export const { actions: matrixActions, reducer: matrixReducer } = slice
