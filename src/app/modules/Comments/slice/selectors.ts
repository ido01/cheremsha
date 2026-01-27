import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { commentsAdapter } from '.'

const { selectAll, selectById } = commentsAdapter.getSelectors()

const selectDomain = (state: RootState) => state.comments

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectDeleteModal = createSelector([selectDomain], (state) => state.delete)

export const selectComments = createSelector(
    [selectDomain],
    (state) => (oid: string, type: string) =>
        selectAll(state).filter((comment) => comment.oid === oid && comment.type === type)
)

export const selectCommentById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
