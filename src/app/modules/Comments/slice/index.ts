import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IComment, ICommentsResponse } from 'types/IComment'

import { commentInit } from './constants'
import { ICommentRequest, ICommentsState } from './types'

export const commentsAdapter = createEntityAdapter<IComment>()

const slice = createSlice({
    name: 'comments',
    initialState: commentsAdapter.getInitialState<ICommentsState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        delete: {
            status: EStatus.INITIAL,
            open: false,
            data: commentInit,
        },
        form: {
            status: EStatus.INITIAL,
            open: false,
            data: commentInit,
        },
    }),
    reducers: {
        cleanComments(state) {
            commentsAdapter.setAll(state, [])
        },
        loadComments(state, action: PayloadAction<ICommentRequest>) {
            action
            state.status = EStatus.PENDING
        },
        commentsLoaded(state, action: PayloadAction<ICommentsResponse>) {
            commentsAdapter.setMany(state, action.payload.data)
            state.status = EStatus.FINISHED
            state.form.status = EStatus.FINISHED
            state.form.open = false
        },
        openEditModal(state, action: PayloadAction<IComment>) {
            state.form.status = EStatus.INITIAL
            state.form.open = true
            state.form.data = action.payload
        },
        hideEditModal(state) {
            state.form.open = false
        },
        createComment(state, action: PayloadAction<IComment>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        updateComment(state, action: PayloadAction<IComment>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        commentSave(state, action: PayloadAction<IComment>) {
            state.form.status = EStatus.FINISHED
            state.form.open = false
            commentsAdapter.setOne(state, action.payload)
        },
        deleteComment(state, action: PayloadAction<string>) {
            state.delete.status = EStatus.PENDING
            action.payload
        },
        commentDeleted(state, action: PayloadAction<string>) {
            commentsAdapter.removeOne(state, action.payload)
            state.delete.open = false
            state.delete.status = EStatus.FINISHED
        },
        setForm(state, action: PayloadAction<IComment>) {
            state.form.status = EStatus.INITIAL
            state.form.data = action.payload
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },
        showDeleteModal(state, action: PayloadAction<IComment>) {
            state.delete.open = true
            state.delete.data = action.payload
        },
        closeDeleteModal(state) {
            state.delete.open = false
        },
    },
})

export const { actions: commentsActions, reducer: commentsReducer } = slice
