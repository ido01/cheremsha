import { call, put, takeLeading } from 'redux-saga/effects'
import { IResponseSettings } from 'types/ISettings'
import { request } from 'utils/request'

import { settingsActions } from '.'

export function* loadSettings() {
    try {
        const response: IResponseSettings = yield call(request, `settings`)

        yield put(settingsActions.settingsLoaded(response))
    } catch (error: any) {
        yield put(settingsActions.statusError())
    }
}

export function* settingsWatcher() {
    yield takeLeading(settingsActions.loadSettings.type, loadSettings)
}
