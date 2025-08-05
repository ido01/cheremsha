import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

const selectDomain = (state: RootState) => state.settings

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectSettings = createSelector([selectDomain], (state) => state.data)
