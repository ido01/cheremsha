import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IStat } from 'types/IStat'

export interface IStatState extends EntityState<IStat> {
    status: EStatus
}
