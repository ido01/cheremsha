import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { call, put, takeLeading } from 'redux-saga/effects'
import { IHand, IHandItemResponse, IHandsCollectionResponse } from 'types/IHand'
import { request } from 'utils/request'

import { handsActions } from '.'

export function* loadHands() {
    try {
        const response: IHandsCollectionResponse = yield call(request, `hands`)

        yield put(handsActions.handsLoaded(response))
    } catch (error: any) {
        yield put(handsActions.statusError())
    }
}

export function* updateHand(action: PayloadAction<IHand>) {
    try {
        const response: IHandItemResponse = yield call(request, `hands/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(handsActions.handSave(response.data))
        toast.success('Данные успешно сохранены', {
            type: 'success',
        })
    } catch (error: any) {
        yield put(handsActions.statusError())
    }
}

export function* createHand(action: PayloadAction<IHand>) {
    try {
        const response: IHandItemResponse = yield call(request, `hands`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(handsActions.handSave(response.data))
    } catch (error: any) {
        yield put(handsActions.statusError())
    }
}

export function* searchHands(action: PayloadAction<string>) {
    try {
        const response: IHandsCollectionResponse = yield call(request, `hands/search`, {
            params: {
                query: action.payload,
            },
        })

        yield put(handsActions.handsLoaded(response))
    } catch (error: any) {
        yield put(handsActions.statusError())
    }
}

export function* deleteHand(action: PayloadAction<string>) {
    try {
        yield call(request, `hands/${action.payload}`, {
            method: 'DELETE',
        })

        yield put(handsActions.handDeleted(action.payload))
    } catch (error: any) {
        yield put(handsActions.statusError())
    }
}

export function* handsWatcher() {
    yield takeLeading(handsActions.loadHands.type, loadHands)
    yield takeLeading(handsActions.updateHand.type, updateHand)
    yield takeLeading(handsActions.createHand.type, createHand)
    yield takeLeading(handsActions.deleteHand.type, deleteHand)
    yield takeLeading(handsActions.searchHands.type, searchHands)
}
