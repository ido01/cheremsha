import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { call, put, takeLeading } from 'redux-saga/effects'
import { IAchieve, IAchieveCollectionResponse, IAchieveItemResponse, IAchieveUser } from 'types/IAchieve'
import { request } from 'utils/request'

import { achieveUserActions } from '.'

export function* loadAchieve(action: PayloadAction<string>) {
    try {
        const response: IAchieveCollectionResponse = yield call(request, `achieve/${action.payload}`)

        yield put(achieveUserActions.achieveLoaded(response))
    } catch (error: any) {
        yield put(achieveUserActions.statusError())
    }
}

export function* updateAchieve(action: PayloadAction<IAchieve>) {
    try {
        const response: IAchieveItemResponse = yield call(request, `achieve/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(achieveUserActions.achieveSave(response.data))
        toast.success('Данные успешно сохранены', {
            type: 'success',
        })
    } catch (error: any) {
        yield put(achieveUserActions.statusError())
    }
}

export function* createAchieve(action: PayloadAction<IAchieveUser>) {
    try {
        const response: IAchieveItemResponse = yield call(request, `achieve/user`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(achieveUserActions.achieveSave(response.data))
    } catch (error: any) {
        yield put(achieveUserActions.statusError())
    }
}

export function* deleteAchieve(action: PayloadAction<IAchieveUser>) {
    try {
        yield call(request, `achieve/${action.payload.id}/user`, {
            method: 'DELETE',
        })

        yield put(achieveUserActions.achieveDeleted(action.payload.aid))
    } catch (error: any) {
        yield put(achieveUserActions.statusError())
    }
}

export function* achieveUserWatcher() {
    yield takeLeading(achieveUserActions.loadAchieve.type, loadAchieve)
    yield takeLeading(achieveUserActions.updateAchieve.type, updateAchieve)
    yield takeLeading(achieveUserActions.createAchieve.type, createAchieve)
    yield takeLeading(achieveUserActions.deleteAchieve.type, deleteAchieve)
}
