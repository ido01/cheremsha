import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { call, put, takeLeading } from 'redux-saga/effects'
import { IAchieve, IAchieveCollectionResponse, IAchieveItemResponse } from 'types/IAchieve'
import { request } from 'utils/request'

import { achieveActions } from '.'

export function* loadAchieve() {
    try {
        const response: IAchieveCollectionResponse = yield call(request, `achieve`)

        yield put(achieveActions.achieveLoaded(response))
    } catch (error: any) {
        yield put(achieveActions.statusError())
    }
}

export function* updateAchieve(action: PayloadAction<IAchieve>) {
    try {
        const response: IAchieveItemResponse = yield call(request, `achieve/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(achieveActions.achieveSave(response.data))
        toast.success('Данные успешно сохранены', {
            type: 'success',
        })
    } catch (error: any) {
        yield put(achieveActions.statusError())
    }
}

export function* createAchieve(action: PayloadAction<IAchieve>) {
    try {
        const response: IAchieveItemResponse = yield call(request, `achieve`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(achieveActions.achieveSave(response.data))
    } catch (error: any) {
        yield put(achieveActions.statusError())
    }
}

export function* deleteAchieve(action: PayloadAction<string>) {
    try {
        yield call(request, `achieve/${action.payload}`, {
            method: 'DELETE',
        })

        yield put(achieveActions.achieveDeleted(action.payload))
    } catch (error: any) {
        yield put(achieveActions.statusError())
    }
}

export function* achieveWatcher() {
    yield takeLeading(achieveActions.loadAchieve.type, loadAchieve)
    yield takeLeading(achieveActions.updateAchieve.type, updateAchieve)
    yield takeLeading(achieveActions.createAchieve.type, createAchieve)
    yield takeLeading(achieveActions.deleteAchieve.type, deleteAchieve)
}
