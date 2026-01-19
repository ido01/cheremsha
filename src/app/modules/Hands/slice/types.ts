import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IHand } from 'types/IHand'

export interface IHandsState extends EntityState<IHand> {
    status: EStatus
    modal: {
        isOpen: boolean
        activeId: string
    }
    deleteModal: {
        status: EStatus
        open: boolean
        data: IHand
    }
    form: {
        status: EStatus
        open: boolean
        data: IHand
    }
}
