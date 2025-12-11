import { call, put, takeLeading } from 'redux-saga/effects'
import { IStatsCollectionResponse } from 'types/IStat'
import { request } from 'utils/request'

import { statsActions } from '.'

export function* loadStat() {
    try {
        const response: IStatsCollectionResponse = yield call(request, `stats`)

        yield put(statsActions.statLoaded(response))
    } catch (error: any) {
        yield put(statsActions.statusError())
    }
}

export function* statsWatcher() {
    yield takeLeading(statsActions.loadStat.type, loadStat)
}
