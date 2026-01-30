import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IExcel } from 'types/IExcel'

export interface IPasteExcel {
    id: string
    parent_id: string
}

export interface IExcelState extends EntityState<IExcel> {
    status: EStatus
    formStatus: EStatus
    moveId: string
    copyId: string
    modal: {
        isOpen: boolean
        activeId: string
        blob: string
    }
    deleteModal: {
        status: EStatus
        open: boolean
        data: IExcel
    }
    form: {
        status: EStatus
        open: boolean
        data: IExcel
        copy: IExcel
    }
}
