import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { reviewssAdapter } from '.'

const { selectAll, selectById } = reviewssAdapter.getSelectors()

const selectDomain = (state: RootState) => state.reviews

export const selectFilter = createSelector([selectDomain], (state) => state.filter)

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectDelete = createSelector([selectDomain], (state) => state.delete)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectPagination = createSelector([selectDomain], (state) => state.pagination)

export const selectReviews = createSelector([selectDomain], (state) =>
    selectAll(state).sort((a, b) => {
        if (a.updatedAt > b.updatedAt) return -1
        return 1
    })
)

export const selectReviewById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
