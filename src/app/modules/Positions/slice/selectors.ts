import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { positionsAdapter } from '.'

const { selectAll, selectById } = positionsAdapter.getSelectors()

const selectDomain = (state: RootState) => state.positions

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectDeleteModal = createSelector([selectDomain], (state) => state.deleteModal)

export const selectModal = createSelector([selectDomain], (state) => state.modal)

export const selectPositions = createSelector([selectDomain], (state) => selectAll(state))

export const selectPositionById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
