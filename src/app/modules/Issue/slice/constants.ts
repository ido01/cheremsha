import { ERole } from 'types'
import { IIssue } from 'types/IIssue'

export const priorities = [
    {
        value: 0,
        label: 'Низкий',
        color: 'rgb(16, 133, 72)',
    },
    {
        value: 1,
        label: 'Средний',
        color: 'rgb(171, 97, 0)',
    },
    {
        value: 2,
        label: 'Высокий',
        color: 'rgb(221, 43, 14)',
    },
]

export const issueInit: IIssue = {
    id: '',
    type: 'folder',
    author_id: '',
    parent_id: '',
    executor_id: '',
    created_at: 0,
    updated_at: 0,
    closed_at: 0,
    deadtime_at: 0,
    title: '',
    description: '',
    status: 'open',
    order_key: 0,
    access_view_id: '',
    access_update_id: '',
    access_view: {
        id: '',
        key_name: '',
        description: '',
        role: ERole.USER,
        user_count: 0,
    },
    access_update: {
        id: '',
        key_name: '',
        description: '',
        role: ERole.USER,
        user_count: 0,
    },
    grade: 0,
    priority: 0,
    grade_name: '',
    createdAt: '',
    closedAt: '',
    updatedAt: '',
    tags: '',
}
