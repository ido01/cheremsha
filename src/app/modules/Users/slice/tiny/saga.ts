import { call, put, takeLeading } from 'redux-saga/effects'
import { ITinyUserCollectionResponse } from 'types/IUser'
import { request } from 'utils/request'

import { tinyUsersActions } from '.'

export function* loadUsers() {
    try {
        const response: ITinyUserCollectionResponse = yield call(request, `tinyUsers`)

        yield put(tinyUsersActions.usersLoaded(response))
    } catch (error: any) {
        yield put(tinyUsersActions.statusError())
    }
}

export function* tinyUsersWatcher() {
    yield takeLeading(tinyUsersActions.loadUsers.type, loadUsers)
}
