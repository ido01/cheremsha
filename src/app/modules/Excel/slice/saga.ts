import { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { call, put, takeLeading } from 'redux-saga/effects'
import { IExcel, IExcelItemResponse, IExcelModifyRequest, IExcelRequest, IExcelsResponse } from 'types/IExcel'
import { request } from 'utils/request'

import { excelActions } from '.'
import { IPasteExcel } from './types'

export function* loadExcel() {
    try {
        const response: IExcelsResponse = yield call(request, `excel`)

        yield put(excelActions.excelLoaded(response.data))
    } catch (error: any) {
        yield put(excelActions.statusError())
    }
}

export function* viewExcel(action: PayloadAction<string>) {
    try {
        const response: IExcelItemResponse = yield call(request, `excel/${action.payload}`)

        yield put(excelActions.setForm(response.data))
    } catch (error: any) {
        yield put(excelActions.statusError())
    }
}

export function* updateExcel(action: PayloadAction<IExcelRequest>) {
    try {
        const data = new FormData()
        action.payload.files.forEach((file) => {
            data.append('file', file)
        })
        data.append('parent_id', action.payload.parent_id)

        const response: IExcelItemResponse = yield call(request, `excel/${action.payload.id}`, {
            method: 'POST',
            data,
        })

        yield put(excelActions.excelUpdated(response.data))
        toast.success('Данные успешно сохранены', {
            type: 'success',
        })
    } catch (error: any) {
        yield put(excelActions.statusError())
    }
}

export function* createExcel(action: PayloadAction<IExcelRequest>) {
    try {
        const data = new FormData()
        action.payload.files.forEach((file) => {
            data.append('files[]', file)
        })
        data.append('parent_id', action.payload.parent_id)

        const response: IExcelsResponse = yield call(request, `excel`, {
            method: 'POST',
            data,
        })

        yield put(excelActions.excelLoaded(response.data))
    } catch (error: any) {
        yield put(excelActions.statusError())
    }
}

export function* searchExcel(action: PayloadAction<string>) {
    try {
        const response: IExcelsResponse = yield call(request, `excel/search`, {
            params: {
                query: action.payload,
            },
        })

        yield put(excelActions.excelLoaded(response.data))
    } catch (error: any) {
        yield put(excelActions.statusError())
    }
}

export function* deleteExcel(action: PayloadAction<string>) {
    try {
        yield call(request, `excel/${action.payload}`, {
            method: 'DELETE',
        })

        yield put(excelActions.excelDeleted(action.payload))
    } catch (error: any) {
        yield put(excelActions.statusError())
    }
}

export function* modifyExcel(action: PayloadAction<IExcelModifyRequest>) {
    try {
        const response: IExcelItemResponse = yield call(request, `excel/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(excelActions.excelUpdated(response.data))
    } catch (error: any) {
        yield put(excelActions.statusError())
    }
}

export function* moveExcel(action: PayloadAction<IPasteExcel>) {
    try {
        const response: IExcelItemResponse = yield call(request, `excel/${action.payload.id}/move`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(excelActions.excelUpdated(response.data))
    } catch (error: any) {
        yield put(excelActions.statusError())
    }
}

export function* reCreateExcel(action: PayloadAction<IExcel>) {
    try {
        const response: IExcelItemResponse = yield call(request, `excel/recreate`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(excelActions.excelUpdated(response.data))
    } catch (error: any) {
        yield put(excelActions.statusError())
    }
}

export function* excelWatcher() {
    yield takeLeading(excelActions.loadExcel.type, loadExcel)
    yield takeLeading(excelActions.viewExcel.type, viewExcel)
    yield takeLeading(excelActions.updateExcel.type, updateExcel)
    yield takeLeading(excelActions.createExcel.type, createExcel)
    yield takeLeading(excelActions.deleteExcel.type, deleteExcel)
    yield takeLeading(excelActions.searchExcel.type, searchExcel)
    yield takeLeading(excelActions.modifyExcel.type, modifyExcel)
    yield takeLeading(excelActions.moveExcel.type, moveExcel)
    yield takeLeading(excelActions.reCreateExcel.type, reCreateExcel)
}
