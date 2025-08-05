import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { pollsAdapter } from '.'

const { selectAll } = pollsAdapter.getSelectors()

const selectDomain = (state: RootState) => state.polls

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectTitle = createSelector([selectDomain], (state) => state.title)

export const selectCount = createSelector([selectDomain], (state) => state.count)

export const selectPolls = createSelector([selectDomain], (state) => selectAll(state))
