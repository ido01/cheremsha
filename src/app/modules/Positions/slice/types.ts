import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IPosition } from 'types/IPosition'

export interface IPositionsState extends EntityState<IPosition> {
    status: EStatus
    modal: {
        isOpen: boolean
        activeId: string
    }
    deleteModal: {
        status: EStatus
        open: boolean
        data: IPosition
    }
    form: {
        status: EStatus
        open: boolean
        data: IPosition
    }
}
