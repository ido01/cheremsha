import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EState, EStatus } from 'types'
import { IReview, IReviewItemResponse, IReviewsCollectionResponse } from 'types/IReview'

import { IReviewFilter, IReviewsState } from './types'

export const reviewssAdapter = createEntityAdapter<IReview>()

const slice = createSlice({
    name: 'reviews',
    initialState: reviewssAdapter.getInitialState<IReviewsState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        pagination: {
            limit: 100,
            page: 1,
            total_pages: 0,
        },
        filter: {
            author: 'all',
            status: 'all',
        },
        delete: {
            status: EStatus.INITIAL,
            open: false,
        },
        form: {
            status: EStatus.INITIAL,
            open: false,
            data: {
                id: '',
                anon: false,
                uid: '',
                type: 'revision',
                title: '',
                description: '',
                status: EState.INITIAL,
                createdAt: 0,
                created: '',
                updatedAt: 0,
                updated: '',
                parentId: '',
                comment: [],
                likes: 0,
                like: false,
            },
        },
    }),
    reducers: {
        cleanReviews(state) {
            reviewssAdapter.setAll(state, [])
            state.pagination.page = 1
            state.pagination.total_pages = 1
        },
        setFilter(state, action: PayloadAction<IReviewFilter>) {
            state.filter = action.payload
        },
        loadReviews(state) {
            state.status = EStatus.PENDING
        },
        reviewsLoaded(state, action: PayloadAction<IReviewsCollectionResponse>) {
            reviewssAdapter.setAll(state, action.payload.data)
            state.pagination.total_pages = action.payload.meta.totalPages
            state.status = EStatus.FINISHED
        },
        openEditModal(state, action: PayloadAction<IReview>) {
            state.form.status = EStatus.INITIAL
            state.form.open = true
            state.form.data = action.payload
        },
        hideEditModal(state) {
            state.form.open = false
        },
        commentReview(state, action: PayloadAction<IReview>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        createReview(state, action: PayloadAction<IReview>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        updateReview(state, action: PayloadAction<IReview>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        statusReview(state, action: PayloadAction<IReview>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        reviewSave(state, action: PayloadAction<IReviewItemResponse>) {
            state.form.status = EStatus.FINISHED
            state.form.open = false
            reviewssAdapter.setOne(state, action.payload.data)
        },
        setForm(state, action: PayloadAction<IReview>) {
            state.form.status = EStatus.INITIAL
            state.form.data = action.payload
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },
        deleteReview(state, action: PayloadAction<string>) {
            state.delete.status = EStatus.PENDING
            action.payload
        },
        mydeleteReview(state, action: PayloadAction<string>) {
            state.delete.status = EStatus.PENDING
            action.payload
        },
        reviewDeleted(state, action: PayloadAction<string>) {
            reviewssAdapter.removeOne(state, action.payload)
            state.delete.open = false
            state.delete.status = EStatus.FINISHED
        },
        openDelete(state) {
            state.delete.open = true
        },
        closeDelete(state) {
            state.delete.open = false
        },
        setPage(state, action: PayloadAction<number>) {
            state.pagination.page = action.payload
        },
        likeReview(state, action: PayloadAction<string>) {
            state
            action
        },
    },
})

export const { actions: reviewsActions, reducer: reviewsReducer } = slice
