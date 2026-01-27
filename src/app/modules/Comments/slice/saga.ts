import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery, takeLeading } from 'redux-saga/effects'
import { IComment, ICommentsResponse } from 'types/IComment'
import { request } from 'utils/request'

import { commentsActions } from '.'
import { ICommentRequest } from './types'

export function* loadComments(action: PayloadAction<ICommentRequest>) {
    try {
        const response: ICommentsResponse = yield call(
            request,
            `comments?oid=${action.payload.oid}&type=${action.payload.type}`
        )

        yield put(commentsActions.commentsLoaded(response))
    } catch (error: any) {
        yield put(commentsActions.statusError())
    }
}

export function* updateComment(action: PayloadAction<IComment>) {
    try {
        const response: ICommentsResponse = yield call(request, `comments/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(commentsActions.commentsLoaded(response))
    } catch (error: any) {
        yield put(commentsActions.statusError())
    }
}

export function* createComment(action: PayloadAction<IComment>) {
    try {
        const response: ICommentsResponse = yield call(request, `comments`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(commentsActions.commentsLoaded(response))
    } catch (error: any) {
        yield put(commentsActions.statusError())
    }
}

export function* deleteComment(action: PayloadAction<string>) {
    try {
        yield call(request, `comments/${action.payload}`, {
            method: 'DELETE',
        })

        yield put(commentsActions.commentDeleted(action.payload))
    } catch (error: any) {
        yield put(commentsActions.statusError())
    }
}

export function* commentsWatcher() {
    yield takeEvery(commentsActions.loadComments.type, loadComments)
    yield takeLeading(commentsActions.updateComment.type, updateComment)
    yield takeLeading(commentsActions.createComment.type, createComment)
    yield takeLeading(commentsActions.deleteComment.type, deleteComment)
}
