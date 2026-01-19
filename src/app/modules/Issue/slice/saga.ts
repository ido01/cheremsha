import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeLeading } from 'redux-saga/effects'
import { IIssue, IIssueResponse, IIssuesResponse } from 'types/IIssue'
import { request } from 'utils/request'

import { issuesActions } from '.'
import { IStatusRequest } from './types'

export function* loadFolder(action: PayloadAction<string>) {
    try {
        const response: IIssuesResponse = yield call(request, `issues/${action.payload}`)

        yield put(issuesActions.issuesLoaded(response.data))
    } catch (error: any) {
        yield put(issuesActions.statusError())
    }
}

export function* loadIssues() {
    try {
        const response: IIssuesResponse = yield call(request, `issues`)

        yield put(issuesActions.issuesLoaded(response.data))
    } catch (error: any) {
        yield put(issuesActions.statusError())
    }
}

export function* createIssue(action: PayloadAction<IIssue>) {
    try {
        const response: IIssueResponse = yield call(request, `issues`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(issuesActions.issueSave(response.data))
    } catch (error: any) {
        yield put(issuesActions.statusError())
    }
}

export function* updateIssue(action: PayloadAction<IIssue>) {
    try {
        const response: IIssueResponse = yield call(request, `issues/${action.payload.id}`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(issuesActions.issueSave(response.data))
    } catch (error: any) {
        yield put(issuesActions.statusError())
    }
}

export function* statusIssue(action: PayloadAction<IStatusRequest>) {
    try {
        const response: IIssueResponse = yield call(request, `issues/status`, {
            method: 'POST',
            data: action.payload,
        })

        yield put(issuesActions.issueSave(response.data))
    } catch (error: any) {
        yield put(issuesActions.statusError())
    }
}

export function* deleteIssue(action: PayloadAction<string>) {
    try {
        yield call(request, `issues/${action.payload}`, {
            method: 'DELETE',
            data: action.payload,
        })

        yield put(issuesActions.issueDeleted(action.payload))
    } catch (error: any) {
        yield put(issuesActions.statusError())
    }
}

export function* issuesWatcher() {
    yield takeLeading(issuesActions.loadIssues.type, loadIssues)
    yield takeLeading(issuesActions.loadFolder.type, loadFolder)
    yield takeLeading(issuesActions.createIssue.type, createIssue)
    yield takeLeading(issuesActions.updateIssue.type, updateIssue)
    yield takeLeading(issuesActions.deleteIssue.type, deleteIssue)
    yield takeLeading(issuesActions.statusIssue.type, statusIssue)
}
