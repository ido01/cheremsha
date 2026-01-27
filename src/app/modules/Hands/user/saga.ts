import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLeading } from 'redux-saga/effects'
import { IHandUser, IHandUserCollectionResponse, IHandUserItemResponse } from 'types/IHand'
import { request } from 'utils/request'

import { handUserActions } from '.'

export function* loadHands(action: PayloadAction<string>) {
    try {
        const response: IHandUserCollectionResponse = yield call(request, `hands/${action.payload}`)

        yield put(handUserActions.handsLoaded(response))
    } catch (error: any) {
        yield put(handUserActions.statusError())
    }
}

export function* createHand(action: PayloadAction<IHandUser>) {
    try {
        const response: IHandUserItemResponse = yield call(request, `hands/user`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(handUserActions.handSave(response.data))
    } catch (error: any) {
        yield put(handUserActions.statusError())
    }
}

export function* deleteHand(action: PayloadAction<string>) {
    try {
        yield call(request, `hands/user/${action.payload}`, {
            method: 'DELETE',
        })

        yield put(handUserActions.handDeleted(action.payload))
    } catch (error: any) {
        yield put(handUserActions.statusError())
    }
}

export function* handUserWatcher() {
    yield takeLeading(handUserActions.loadHands.type, loadHands)
    yield takeLeading(handUserActions.createHand.type, createHand)
    yield takeLeading(handUserActions.deleteHand.type, deleteHand)
}
