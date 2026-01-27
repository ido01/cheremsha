import { call, put, takeLeading } from 'redux-saga/effects'
import { IHandsCollectionResponse } from 'types/IHand'
import { request } from 'utils/request'

import { rolesActions } from '.'

export function* loadRoles() {
    try {
        const response: IHandsCollectionResponse = yield call(request, `hands`)

        yield put(rolesActions.rolesLoaded(response))
    } catch (error: any) {
        yield put(rolesActions.statusError())
    }
}

export function* rolesWatcher() {
    yield takeLeading(rolesActions.loadRoles.type, loadRoles)
}
