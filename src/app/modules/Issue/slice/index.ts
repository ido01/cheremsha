import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IIssue } from 'types/IIssue'

import { issueInit } from './constants'
import { IIssuesState, IStatusRequest } from './types'

export const issuesAdapter = createEntityAdapter<IIssue>()

const slice = createSlice({
    name: 'issues',
    initialState: issuesAdapter.getInitialState<IIssuesState>({
        ids: [],
        entities: {},
        status: EStatus.INITIAL,
        steps: {
            loading: false,
            status: 'open',
            id: '',
        },
        executor: {
            status: EStatus.INITIAL,
            open: false,
            data: issueInit,
        },
        delete: {
            status: EStatus.INITIAL,
            open: false,
            data: issueInit,
        },
        form: {
            status: EStatus.INITIAL,
            open: false,
            data: issueInit,
        },
    }),
    reducers: {
        loadIssues(state) {
            state.status = EStatus.PENDING
        },
        loadFolder(state, action: PayloadAction<string>) {
            state.status = EStatus.PENDING
            action
        },
        issuesLoaded(state, action: PayloadAction<IIssue[]>) {
            issuesAdapter.setMany(state, action.payload)
            state.status = EStatus.FINISHED
        },
        openEditModal(state, action: PayloadAction<IIssue>) {
            console.log('PDDTF action', action)
            state.form.status = EStatus.INITIAL
            state.form.open = true
            state.form.data = action.payload
        },
        hideEditModal(state) {
            state.form.open = false
            state.form.data.parent_id = ''
        },
        createIssue(state, action: PayloadAction<IIssue>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        updateIssue(state, action: PayloadAction<IIssue>) {
            state.form.status = EStatus.PENDING
            state.form.data = action.payload
        },
        issueSave(state, action: PayloadAction<IIssue>) {
            state.form.status = EStatus.FINISHED
            state.form.open = false
            state.executor.open = false
            state.steps = {
                loading: false,
                id: '',
                status: 'open',
            }
            issuesAdapter.setOne(state, action.payload)
        },
        deleteIssue(state, action: PayloadAction<string>) {
            state.delete.status = EStatus.PENDING
            action.payload
        },
        issueDeleted(state, action: PayloadAction<string>) {
            issuesAdapter.removeOne(state, action.payload)
            state.delete.open = false
            state.delete.status = EStatus.INITIAL
        },
        statusIssue(state, action: PayloadAction<IStatusRequest>) {
            state.steps = {
                loading: true,
                ...action.payload,
            }
        },
        showDeleteModal(state, action: PayloadAction<IIssue>) {
            state.delete.open = true
            state.delete.data = action.payload
        },
        closeDeleteModal(state) {
            state.delete.open = false
        },
        showFindModal(state, action: PayloadAction<IIssue>) {
            state.executor.open = true
            state.executor.data = action.payload
        },
        closeFindModal(state) {
            state.executor.open = false
        },
        statusError(state) {
            state.status = EStatus.ERROR
            state.form.status = EStatus.ERROR
        },
    },
})

export const { actions: issuesActions, reducer: issuesReducer } = slice
