import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { IIssue, TCollapseKey } from 'types/IIssue'

interface Props {
    open: boolean
    issue?: IIssue
    onCollapse: (value: TCollapseKey) => void
}

interface DateProps {
    label: string
    value: string
}

const Date: React.FC<DateProps> = ({ label, value }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Typography variant="caption">{label}</Typography>
            <Typography variant="body3" fontWeight={600} sx={{ px: 1 }}>
                {value}
            </Typography>
        </Box>
    )
}

export const DateRow: React.FC<Props> = ({ open, issue, onCollapse }) => {
    const handleClick = () => {
        onCollapse('date')
    }

    if (!issue) {
        return null
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    cursor: 'pointer',
                }}
                onClick={handleClick}
            >
                <Typography variant="caption">Даты</Typography>
                {open ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />}
            </Box>
            <Box
                sx={{
                    maxHeight: open ? '1000vh' : '0px',
                    overflow: 'hidden',
                    transition: '0.1s',
                    p: open ? 1 : 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                {issue.deadtimeAt && <Date label="Ожидаемый срок выполнения:" value={issue.deadtimeAt} />}
                <Date label="Создано:" value={issue.createdAt} />
                <Date label="Обновлено:" value={issue.updatedAt} />
                {issue.type === 'task' && <Date label="Решено:" value={issue.closed_at ? issue.closedAt : '-'} />}
            </Box>
        </Box>
    )
}
