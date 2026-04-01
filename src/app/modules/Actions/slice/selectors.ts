import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { actionsAdapter } from '.'

const { selectAll, selectById } = actionsAdapter.getSelectors()

const selectDomain = (state: RootState) => state.actions

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectStatusUser = createSelector([selectDomain], (state) => state.statusUser)

export const selectFilter = createSelector([selectDomain], (state) => state.filter)

export const selectFilterUser = createSelector([selectDomain], (state) => state.filterUser)

export const selectTotalCount = createSelector([selectDomain], (state) => state.total_count)

export const selectOrder = createSelector([selectDomain], (state) => state.order)

export const selectPagination = createSelector([selectDomain], (state) => state.pagination)

export const selectPaginationUser = createSelector([selectDomain], (state) => state.paginationUser)

export const selectActions = createSelector([selectDomain], (state) => selectAll(state))

export const selectActionsUser = createSelector([selectDomain], (state) => state.userActions)

export const selectActionById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
