import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IStat } from 'types/IStat'

type TPlace = 'hrzn' | 'nsns'
export interface IStatState extends EntityState<IStat> {
    status: EStatus
}

export interface ChartProps {
    id: number
    place: TPlace
    title: string
    description: string
    type: 'reserv' | 'new' | 'hook' | 'tea'
    period: 'year' | 'month' | 'day' | 'hour'
    result: 'floor' | 'absolute'
    borderColor: string
    backgroundColor: string
    ref?: TPlace[]
}
