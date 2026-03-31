import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { actionsAdapter } from '.'

const { selectAll, selectById } = actionsAdapter.getSelectors()

const selectDomain = (state: RootState) => state.actions

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectFilter = createSelector([selectDomain], (state) => state.filter)

export const selectTotalCount = createSelector([selectDomain], (state) => state.total_count)

export const selectOrder = createSelector([selectDomain], (state) => state.order)

export const selectPagination = createSelector([selectDomain], (state) => state.pagination)

export const selectActions = createSelector([selectDomain], (state) => selectAll(state))

export const selectActionById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
