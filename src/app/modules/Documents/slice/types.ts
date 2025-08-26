import { EntityState } from '@reduxjs/toolkit'
import { EStatus, EType } from 'types'
import { IDocument } from 'types/IDocument'
import { TTableOrder } from 'types/ITableDisplay'

export interface IPasteDocument {
    id: string
    parentId: string
    path: EType
}

export interface IDocumentsState extends EntityState<IDocument> {
    status: EStatus
    order: TTableOrder
    moveId: string
    modal: {
        isOpen: boolean
        activeId: string
    }
    form: {
        status: EStatus
        open: boolean
        data: IDocument
    }
}
