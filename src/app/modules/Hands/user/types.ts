import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IHandUser } from 'types/IHand'

export interface IHandUserState extends EntityState<IHandUser> {
    status: EStatus
    deleteModal: {
        status: EStatus
        open: boolean
        data: IHandUser
    }
    form: {
        status: EStatus
        open: boolean
        data: IHandUser
    }
}
