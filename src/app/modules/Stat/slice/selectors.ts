import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { statsAdapter } from '.'

const { selectAll, selectById } = statsAdapter.getSelectors()

const selectDomain = (state: RootState) => state.stats

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectStats = createSelector([selectDomain], (state) => selectAll(state))

export const selectStatById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
