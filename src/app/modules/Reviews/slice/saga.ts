import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { call, put, select, takeLeading } from 'redux-saga/effects'
import { IReview, IReviewItemResponse, IReviewsCollectionResponse } from 'types/IReview'
import { TTablePagination } from 'types/ITableDisplay'
import { request } from 'utils/request'

import { reviewsActions } from '.'
import { selectFilter, selectPagination } from './selectors'
import { IReviewFilter } from './types'

export function* loadReviews() {
    try {
        const pagination: TTablePagination = yield select(selectPagination)
        const filter: IReviewFilter = yield select(selectFilter)

        const response: IReviewsCollectionResponse = yield call(request, `reviews`, {
            params: {
                page: pagination.page,
                limit: pagination.limit,
                author: filter.author,
                status: filter.status,
            },
        })

        yield put(reviewsActions.reviewsLoaded(response))
    } catch (error: any) {
        yield put(reviewsActions.statusError())
    }
}

export function* updateReview(action: PayloadAction<IReview>) {
    try {
        const response: IReviewItemResponse = yield call(request, `reviews/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(reviewsActions.reviewSave(response))
        toast.success('Данные успешно сохранены', {
            type: 'success',
        })
    } catch (error: any) {
        yield put(reviewsActions.statusError())
    }
}

export function* createReview(action: PayloadAction<IReview>) {
    try {
        const response: IReviewItemResponse = yield call(request, `reviews`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(reviewsActions.reviewSave(response))
    } catch (error: any) {
        yield put(reviewsActions.statusError())
    }
}

export function* commentReview(action: PayloadAction<IReview>) {
    try {
        const response: IReviewItemResponse = yield call(request, `reviews/comment`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(reviewsActions.reviewSave(response))
    } catch (error: any) {
        yield put(reviewsActions.statusError())
    }
}

export function* statusReview(action: PayloadAction<IReview>) {
    try {
        const response: IReviewItemResponse = yield call(request, `reviews/${action.payload.id}/status`, {
            method: 'PATCH',
            data: {
                status: action.payload.status,
            },
        })

        yield put(reviewsActions.reviewSave(response))
    } catch (error: any) {
        yield put(reviewsActions.statusError())
    }
}

export function* deleteReview(action: PayloadAction<string>) {
    try {
        yield call(request, `reviews/${action.payload}`, {
            method: 'DELETE',
        })

        yield put(reviewsActions.reviewDeleted(action.payload))
    } catch (error: any) {
        yield put(reviewsActions.statusError())
    }
}

export function* mydeleteReview(action: PayloadAction<string>) {
    try {
        yield call(request, `reviews/${action.payload}/my`, {
            method: 'DELETE',
        })

        yield put(reviewsActions.reviewDeleted(action.payload))
    } catch (error: any) {
        yield put(reviewsActions.statusError())
    }
}

export function* likeReview(action: PayloadAction<string>) {
    try {
        const response: IReviewItemResponse = yield call(request, `reviews/${action.payload}/like`, {
            method: 'POST',
        })

        yield put(reviewsActions.reviewSave(response))
    } catch (error: any) {
        yield put(reviewsActions.statusError())
    }
}

export function* reviewsWatcher() {
    yield takeLeading(reviewsActions.loadReviews.type, loadReviews)
    yield takeLeading(reviewsActions.updateReview.type, updateReview)
    yield takeLeading(reviewsActions.createReview.type, createReview)
    yield takeLeading(reviewsActions.commentReview.type, commentReview)
    yield takeLeading(reviewsActions.statusReview.type, statusReview)
    yield takeLeading(reviewsActions.deleteReview.type, deleteReview)
    yield takeLeading(reviewsActions.mydeleteReview.type, mydeleteReview)
    yield takeLeading(reviewsActions.likeReview.type, likeReview)
}
