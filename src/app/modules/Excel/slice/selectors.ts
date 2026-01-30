import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'types'

import { excelAdapter } from './'

const { selectAll, selectById } = excelAdapter.getSelectors()

const selectDomain = (state: RootState) => state.excel

export const selectFormStatus = createSelector([selectDomain], (state) => state.formStatus)

export const selectForm = createSelector([selectDomain], (state) => state.form)

export const selectModal = createSelector([selectDomain], (state) => state.modal)

export const selectMoveExcelId = createSelector([selectDomain], (state) => state.moveId)

export const selectCopyExcelId = createSelector([selectDomain], (state) => state.copyId)

export const selectExcels = createSelector(
    [selectDomain],
    (state) => (id: string) => selectAll(state).filter((category) => category.parent_id === id)
)

export const selectExcelById = createSelector([selectDomain], (state) => (id: string) => selectById(state, id))

export const selectSearchExcel = createSelector(
    [selectDomain],
    (state) => (search: string, id: string) =>
        selectAll(state)
            .filter((category) => category.parent_id === id)
            .filter((category) => {
                const words = search.toLowerCase().split(' ')

                let find = true

                words.forEach((word) => {
                    if (category.name.toLowerCase().indexOf(word.trim()) === -1) find = false
                })

                return find
            })
)
