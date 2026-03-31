import { PayloadAction } from '@reduxjs/toolkit'
import { categoriesActions } from 'app/modules/Categories/slice'
import { toast } from 'react-toastify'
import { call, put, takeLeading } from 'redux-saga/effects'
import { ICategoryResponse } from 'types/ICategory'
import {
    IMatrix,
    IMatrixCollectionResponse,
    IMatrixItemResponse,
    IMatrixPositionFindResponse,
    IMatrixUserRequest,
} from 'types/IMatrix'
import { request } from 'utils/request'

import { matrixActions } from '.'

export function* findPosition(action: PayloadAction<string>) {
    try {
        const response: IMatrixPositionFindResponse = yield call(request, `matrix/min`, {
            method: 'POST',
            data: {
                parentId: action.payload,
            },
        })

        yield put(matrixActions.positionFind(response.position))
    } catch (error: any) {
        yield put(matrixActions.statusError())
    }
}

export function* updateMatrix(action: PayloadAction<IMatrix>) {
    try {
        const response: IMatrixItemResponse = yield call(request, `matrix/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(matrixActions.matrixSave(response.data))
        toast.success('Данные успешно сохранены', {
            type: 'success',
        })
    } catch (error: any) {
        yield put(matrixActions.statusError())
    }
}

export function* createMatrix(action: PayloadAction<IMatrix>) {
    try {
        const response: IMatrixItemResponse = yield call(request, `matrix`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(matrixActions.matrixSave(response.data))
    } catch (error: any) {
        yield put(matrixActions.statusError())
    }
}

export function* user(action: PayloadAction<IMatrixUserRequest>) {
    try {
        const response: ICategoryResponse = yield call(request, `matrix/user`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(categoriesActions.categoryReloaded(response.data))
        yield put(matrixActions.userDone())
    } catch (error: any) {
        yield put(matrixActions.statusError())
    }
}

export function* userDelete(action: PayloadAction<string>) {
    try {
        const response: ICategoryResponse = yield call(request, `matrix/${action.payload}/user`, {
            method: 'DELETE',
        })

        yield put(categoriesActions.categoryReloaded(response.data))
    } catch (error: any) {
        yield put(matrixActions.statusError())
    }
}

export function* empty(action: PayloadAction<string>) {
    try {
        const response: IMatrixItemResponse = yield call(request, `matrix/${action.payload}/empty`, {
            method: 'POST',
        })

        yield put(matrixActions.matrixSave(response.data))
    } catch (error: any) {
        yield put(matrixActions.statusError())
    }
}

export function* stock(action: PayloadAction<string>) {
    try {
        const response: IMatrixItemResponse = yield call(request, `matrix/${action.payload}/stock`, {
            method: 'POST',
        })

        yield put(matrixActions.matrixSave(response.data))
    } catch (error: any) {
        yield put(matrixActions.statusError())
    }
}

export function* send(action: PayloadAction<string>) {
    try {
        yield call(request, `matrix/${action.payload}/send`, {
            method: 'POST',
        })
        yield put(matrixActions.matrixSend())
    } catch (error: any) {
        yield put(matrixActions.statusError())
    }
}

export function* stockAll(action: PayloadAction<string>) {
    try {
        const response: IMatrixCollectionResponse = yield call(request, `matrix/${action.payload}/stock/all`, {
            method: 'POST',
        })

        yield put(matrixActions.matrixLoaded(response.data))
    } catch (error: any) {
        yield put(matrixActions.statusError())
    }
}

export function* searchMatrix(action: PayloadAction<string>) {
    try {
        const response: IMatrixCollectionResponse = yield call(request, `matrix/search`, {
            params: {
                query: action.payload,
            },
        })

        yield put(matrixActions.matrixLoaded(response.data))
    } catch (error: any) {
        yield put(matrixActions.statusError())
    }
}

export function* deleteMatrix(action: PayloadAction<string>) {
    try {
        yield call(request, `matrix/${action.payload}`, {
            method: 'DELETE',
        })

        yield put(matrixActions.matrixDeleted(action.payload))
    } catch (error: any) {
        yield put(matrixActions.statusError())
    }
}

export function* matrixWatcher() {
    yield takeLeading(matrixActions.updateMatrix.type, updateMatrix)
    yield takeLeading(matrixActions.findPosition.type, findPosition)
    yield takeLeading(matrixActions.createMatrix.type, createMatrix)
    yield takeLeading(matrixActions.deleteMatrix.type, deleteMatrix)
    yield takeLeading(matrixActions.searchMatrix.type, searchMatrix)
    yield takeLeading(matrixActions.user.type, user)
    yield takeLeading(matrixActions.userDelete.type, userDelete)
    yield takeLeading(matrixActions.empty.type, empty)
    yield takeLeading(matrixActions.stock.type, stock)
    yield takeLeading(matrixActions.send.type, send)
    yield takeLeading(matrixActions.stockAll.type, stockAll)
}
