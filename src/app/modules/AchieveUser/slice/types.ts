import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IAchieve, IAchieveUser } from 'types/IAchieve'

export interface IAchieveUserState extends EntityState<IAchieve> {
    status: EStatus
    modal: {
        isOpen: boolean
        activeId: string
    }
    deleteModal: {
        status: EStatus
        open: boolean
        data: IAchieve
    }
    form: {
        status: EStatus
        open: boolean
        data: IAchieveUser
    }
}
