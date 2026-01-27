import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { handuserAdapter } from '.'

const { selectAll, selectById } = handuserAdapter.getSelectors()

const selectDomain = (state: RootState) => state.handUser

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectDeleteModal = createSelector([selectDomain], (state) => state.deleteModal)

export const selectHandUsers = createSelector(
    [selectDomain],
    (state) => (uid: string) => selectAll(state).filter((hand) => hand.uid === uid)
)

export const selectHandById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
