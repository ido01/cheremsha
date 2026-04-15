import { IAcecssInterface } from './IHand'
import { IUser } from './IUser'

export type TCollapseKey = 'description' | 'subTasks' | 'authors' | 'date' | 'detail' | 'comments'

export type TCollapse = { [key in TCollapseKey]: boolean }

export type TIssueStatus = 'open' | 'progress' | 'review' | 'done' | 'error' | 'closed' | 'deleted'

export interface IIssue extends IAcecssInterface {
    id: string
    type: 'folder' | 'task'
    author_id: string
    parent_id: string
    executor_id: string
    created_at: number
    updated_at: number
    closed_at: number
    deadtime_at: number
    title: string
    description: string
    status: TIssueStatus
    order_key: number
    grade: number
    grade_name: string
    createdAt: string
    updatedAt: string
    closedAt: string
    deadtimeAt?: string
    deadtimeFormAt?: string
    priority: number
    tags: string
    place_id: string
    author?: IUser
    executor?: IUser
}

export interface IIssuesResponse {
    data: IIssue[]
}

export interface IIssueResponse {
    data: IIssue
}
