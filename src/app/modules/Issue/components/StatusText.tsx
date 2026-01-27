import { Box, Typography } from '@mui/material'
import React from 'react'
import { TIssueStatus } from 'types/IIssue'

interface Props {
    status: TIssueStatus
    size?: number
}

export const StatusText: React.FC<Props> = ({ status }) => {
    if (status === 'progress') {
        return (
            <Box
                sx={{
                    borderRadius: 1,
                    backgroundColor: 'rgba(31, 117, 203, 0.2)',
                    color: 'rgb(31, 117, 203)',
                    px: 1,
                }}
            >
                <Typography variant="caption" fontWeight="600">
                    В работе
                </Typography>
            </Box>
        )
    }

    if (status === 'done') {
        return (
            <Box
                sx={{
                    borderRadius: 1,
                    backgroundColor: 'rgb(216, 230, 220)',
                    color: 'rgb(16, 133, 72)',
                    px: 1,
                }}
            >
                <Typography variant="caption" fontWeight="600">
                    Выполнено
                </Typography>
            </Box>
        )
    }

    if (status === 'error') {
        return (
            <Box
                sx={{
                    borderRadius: 1,
                    backgroundColor: 'rgb(253, 212, 205)',
                    color: 'rgb(221, 43, 14)',
                    px: 1,
                }}
            >
                <Typography variant="caption" fontWeight="600">
                    Отклонено
                </Typography>
            </Box>
        )
    }

    if (status === 'review') {
        return (
            <Box
                sx={{
                    borderRadius: 1,
                    backgroundColor: 'rgb(245, 217, 168)',
                    color: 'rgb(171, 97, 0)',
                    px: 1,
                }}
            >
                <Typography variant="caption" fontWeight="600">
                    Проверка
                </Typography>
            </Box>
        )
    }

    if (status === 'closed') {
        return (
            <Box
                sx={{
                    borderRadius: 1,
                    backgroundColor: '#A1887F',
                    color: '#3E2723',
                    px: 1,
                }}
            >
                <Typography variant="caption" fontWeight="600">
                    Отклонена
                </Typography>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                borderRadius: 1,
                backgroundColor: 'rgb(220, 220, 222)',
                color: 'rgb(115, 114, 120)',
                px: 1,
            }}
        >
            <Typography variant="caption" fontWeight="600">
                Открыта
            </Typography>
        </Box>
    )
}
