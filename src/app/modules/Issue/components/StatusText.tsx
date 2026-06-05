import { Box, Typography } from '@mui/material'
import React from 'react'
import { TIssueStatus } from 'types/IIssue'

interface Props {
    status: TIssueStatus
    size?: number
}

interface TagProps {
    backgroundColor: string
    color: string
    label: string
}

const Tag: React.FC<TagProps> = ({ backgroundColor, color, label }) => {
    return (
        <Box
            sx={{
                borderRadius: 1,
                backgroundColor,
                color,
                px: 1,
                flexShrink: 0,
            }}
        >
            <Typography variant="caption" fontWeight="600">
                {label}
            </Typography>
        </Box>
    )
}

export const StatusText: React.FC<Props> = ({ status }) => {
    if (status === 'progress') {
        return <Tag backgroundColor="rgba(31, 117, 203, 0.2)" color="rgb(31, 117, 203)" label="В работе" />
    }

    if (status === 'done') {
        return <Tag backgroundColor="rgb(216, 230, 220)" color="rgb(16, 133, 72)" label="Выполнено" />
    }

    if (status === 'error') {
        return <Tag backgroundColor="rgb(253, 212, 205)" color="rgb(221, 43, 14)" label="Отклонено" />
    }

    if (status === 'review') {
        return <Tag backgroundColor="rgb(245, 217, 168)" color="rgb(171, 97, 0)" label="Проверка" />
    }

    if (status === 'closed') {
        return <Tag backgroundColor="#A1887F" color="#3E2723" label="Отклонена" />
    }

    return <Tag backgroundColor="rgb(220, 220, 222)" color="rgb(115, 114, 120)" label="Открыта" />
}
