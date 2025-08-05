import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { ITinyUser } from 'types/IUser'

export interface ITinyUsersState extends EntityState<ITinyUser> {
    status: EStatus
}
