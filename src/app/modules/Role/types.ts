import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IHand } from 'types/IHand'

export interface IRoleState extends EntityState<IHand> {
    status: EStatus
}
