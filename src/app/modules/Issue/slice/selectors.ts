import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { issuesAdapter } from '.'

const { selectAll, selectById } = issuesAdapter.getSelectors()

const selectDomain = (state: RootState) => state.issues

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectSteps = createSelector([selectDomain], (state) => state.steps)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectDeleteModal = createSelector([selectDomain], (state) => state.delete)

export const selectExecutorModal = createSelector([selectDomain], (state) => state.executor)

export const selectIssues = createSelector([selectDomain], (state) => selectAll(state))

export const selectIssuesFolder = createSelector(
    [selectDomain],
    (state) => (id: string) => selectAll(state).filter((issue) => issue.parent_id === id && issue.status !== 'deleted')
)

export const selectIssueById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
