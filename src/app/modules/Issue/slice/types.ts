import { EntityState } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IIssue, TIssueStatus } from 'types/IIssue'

export interface IStatusRequest {
    id: string
    status: TIssueStatus
}

export interface IIssuesState extends EntityState<IIssue> {
    status: EStatus
    steps: {
        loading: boolean
        status: TIssueStatus
        id: string
    }
    executor: {
        status: EStatus
        open: boolean
        data: IIssue
    }
    delete: {
        status: EStatus
        open: boolean
        data: IIssue
    }
    form: {
        status: EStatus
        open: boolean
        data: IIssue
    }
}
