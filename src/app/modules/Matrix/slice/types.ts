import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IMatrix } from 'types/IMatrix'

export interface IMatrixState extends EntityState<IMatrix> {
    status: {
        main: EStatus
        empty: EStatus
        stock: EStatus
        stockAll: EStatus
        send: EStatus
        user: EStatus
    }
    modal: {
        isOpen: boolean
        activeId: string
    }
    users: {
        isOpen: boolean
        activeId: string
    }
    find: {
        isOpen: boolean
        activeId: string
    }
    send: {
        isOpen: boolean
        activeId: string
    }
    deleteModal: {
        status: EStatus
        open: boolean
        data: IMatrix
    }
    form: {
        status: EStatus
        find: EStatus
        open: boolean
        data: IMatrix
    }
}
