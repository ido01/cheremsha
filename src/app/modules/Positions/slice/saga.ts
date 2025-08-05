import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { call, put, takeLeading } from 'redux-saga/effects'
import { IPosition, IPositionItemResponse, IPositionsCollectionResponse } from 'types/IPosition'
import { request } from 'utils/request'

import { positionsActions } from '.'

export function* loadPositions() {
    try {
        const response: IPositionsCollectionResponse = yield call(request, `positions`)

        yield put(positionsActions.positionsLoaded(response))
    } catch (error: any) {
        yield put(positionsActions.statusError())
    }
}

export function* updatePosition(action: PayloadAction<IPosition>) {
    try {
        const response: IPositionItemResponse = yield call(request, `positions/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(positionsActions.positionSave(response.data))
        toast.success('Данные успешно сохранены', {
            type: 'success',
        })
    } catch (error: any) {
        yield put(positionsActions.statusError())
    }
}

export function* createPosition(action: PayloadAction<IPosition>) {
    try {
        const response: IPositionItemResponse = yield call(request, `positions`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(positionsActions.positionSave(response.data))
    } catch (error: any) {
        yield put(positionsActions.statusError())
    }
}

export function* deletePosition(action: PayloadAction<string>) {
    try {
        yield call(request, `positions/${action.payload}`, {
            method: 'DELETE',
        })

        yield put(positionsActions.positionDeleted(action.payload))
    } catch (error: any) {
        yield put(positionsActions.statusError())
    }
}

export function* positionsWatcher() {
    yield takeLeading(positionsActions.loadPositions.type, loadPositions)
    yield takeLeading(positionsActions.updatePosition.type, updatePosition)
    yield takeLeading(positionsActions.createPosition.type, createPosition)
    yield takeLeading(positionsActions.deletePosition.type, deletePosition)
}
