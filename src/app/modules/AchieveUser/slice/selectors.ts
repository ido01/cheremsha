import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { achieveAdapter } from '.'

const { selectAll, selectById } = achieveAdapter.getSelectors()

const selectDomain = (state: RootState) => state.achieve_user

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectDeleteModal = createSelector([selectDomain], (state) => state.deleteModal)

export const selectModal = createSelector([selectDomain], (state) => state.modal)

export const selectAchieve = createSelector([selectDomain], (state) => selectAll(state))

export const selectAchieveById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
