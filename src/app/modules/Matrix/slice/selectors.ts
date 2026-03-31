import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { matrixAdapter } from '.'

const { selectAll, selectById } = matrixAdapter.getSelectors()

const selectDomain = (state: RootState) => state.matrix

export const selectStatus = createSelector([selectDomain], (state) => state.status)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectDeleteModal = createSelector([selectDomain], (state) => state.deleteModal)

export const selectModal = createSelector([selectDomain], (state) => state.modal)

export const selectFind = createSelector([selectDomain], (state) => state.find)

export const selectSend = createSelector([selectDomain], (state) => state.send)

export const selectuserModal = createSelector([selectDomain], (state) => state.users)

export const selectMatrix = createSelector(
    [selectDomain],
    (state) => (parentId: string) =>
        selectAll(state)
            .filter((item) => item.parentId === parentId)
            .sort((a, b) => (a.position > b.position ? 1 : -1))
)

export const selectMatrixEmpty = createSelector(
    [selectDomain],
    (state) => (parentId: string) =>
        selectAll(state)
            .filter((item) => item.parentId === parentId && item.empty)
            .sort((a, b) => (a.position > b.position ? 1 : -1))
)

export const selectMatrixNoempty = createSelector(
    [selectDomain],
    (state) => (parentId: string) =>
        selectAll(state)
            .filter((item) => item.parentId === parentId && !item.empty)
            .sort((a, b) => (a.position > b.position ? 1 : -1))
)

export const selectMatrixById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))
