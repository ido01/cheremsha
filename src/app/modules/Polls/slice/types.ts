import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IPollQuestion } from 'types/IPoll'

export interface IPollsState extends EntityState<IPollQuestion> {
    status: EStatus
    title: string
}
