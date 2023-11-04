import { call, put, takeLeading } from 'redux-saga/effects'
import { IPollsResponse } from 'types/IPoll'
import { request } from 'utils/request'

import { pollsActions } from '.'

export function* loadPolls() {
    try {
        const response: IPollsResponse = yield call(request, `polls`)

        yield put(pollsActions.pollsLoaded(response))
    } catch (error: any) {
        yield put(pollsActions.statusError())
    }
}

export function* reloadPolls() {
    try {
        const response: IPollsResponse = yield call(request, `polls/reload`)

        yield put(pollsActions.pollsLoaded(response))
    } catch (error: any) {
        yield put(pollsActions.statusError())
    }
}

export function* pollsWatcher() {
    yield takeLeading(pollsActions.loadPolls.type, loadPolls)
    yield takeLeading(pollsActions.reloadPolls.type, reloadPolls)
}
