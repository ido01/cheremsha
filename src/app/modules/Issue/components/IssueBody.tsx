import { Box } from '@mui/material'
import React, { useState } from 'react'
import { IIssue, TCollapse, TCollapseKey } from 'types/IIssue'

import { CommentsRow } from './CommentsRow'
import { ControlBlock } from './ControlBlock'
import { DateRow } from './DateRow'
import { DescriptionRow } from './DescriptionRow'
import { SubtaskRow } from './SubtaskRow'
import { TaskDetail } from './TaskDetail'
import { UsersRow } from './UsersRow'

interface Props {
    id: string
    main?: boolean
    open: boolean
    isInit: boolean
    issue?: IIssue
}

export const IssueBody: React.FC<Props> = ({ id, main, open, issue, isInit }) => {
    const [collapse, setCollapse] = useState<TCollapse>({
        description: true,
        subTasks: isInit,
        authors: true,
        date: true,
        detail: true,
        comments: false,
    })

    const handleCollapse = (key: TCollapseKey) => {
        setCollapse((value) => ({
            ...value,
            [key]: !value[key],
        }))
    }

    const props = {
        issue,
        onCollapse: handleCollapse,
    }

    return (
        <Box
            sx={{
                maxHeight: open ? '1000vh' : '0px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: open && !main ? 1 : 0,
                pl: open && !main ? 2 : 0,
                overflow: 'hidden',
                transition: '0.1s',
                width: '100%',
            }}
        >
            {issue?.type === 'task' && <ControlBlock issue={issue} />}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <TaskDetail {...props} open={collapse.detail} />
                    <DescriptionRow {...props} open={collapse.description} />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <UsersRow {...props} open={collapse.authors} />

                    <DateRow {...props} open={collapse.date} />
                </Box>
            </Box>

            <CommentsRow {...props} open={collapse.comments} />

            <SubtaskRow id={id} onCollapse={handleCollapse} isInit={isInit} open={collapse.subTasks} />
        </Box>
    )
}
