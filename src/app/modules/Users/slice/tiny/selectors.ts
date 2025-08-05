import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { tinyUsersAdapter } from '.'

const { selectAll } = tinyUsersAdapter.getSelectors()

const selectDomain = (state: RootState) => state.tinyUsers

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectUsers = createSelector([selectDomain], (state) => selectAll(state))
