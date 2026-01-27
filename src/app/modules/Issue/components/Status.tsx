// import { IncompleteCircle as IncompleteCircleIcon } from '@mui/icons-material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import NotInterestedIcon from '@mui/icons-material/NotInterested'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import { Box } from '@mui/material'
import React from 'react'
import { TIssueStatus } from 'types/IIssue'

interface Props {
    status: TIssueStatus
    size?: number
}

export const Status: React.FC<Props> = ({ status, size = 50 }) => {
    if (status === 'progress') {
        return (
            <Box
                sx={{
                    borderRadius: '50%',
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: '#fff',
                    border: '6px solid rgba(31, 117, 203, 0.2)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                }}
            >
                <Box
                    sx={{
                        width: '0px',
                        height: '0px',
                        borderRadius: '100%',
                        border: '16px solid',
                        borderColor: 'transparent rgb(31, 117, 203) rgb(31, 117, 203) rgb(31, 117, 203)',
                        transform: 'rotate(-45deg)',
                    }}
                ></Box>
            </Box>
        )
    }

    if (status === 'done') {
        return (
            <Box
                sx={{
                    borderRadius: '50%',
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: 'rgb(16, 133, 72)',
                    border: '6px solid rgb(216, 230, 220)',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                }}
            >
                <CheckIcon />
            </Box>
        )
    }

    if (status === 'error') {
        return (
            <Box
                sx={{
                    borderRadius: '50%',
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: 'rgb(221, 43, 14)',
                    border: '6px solid rgb(253, 212, 205)',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                }}
            >
                <CloseIcon />
            </Box>
        )
    }

    if (status === 'review') {
        return (
            <Box
                sx={{
                    borderRadius: '50%',
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: 'rgb(171, 97, 0)',
                    border: '6px solid rgb(245, 217, 168)',
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                }}
            >
                <PriorityHighIcon />
            </Box>
        )
    }

    if (status === 'closed') {
        return (
            <Box
                sx={{
                    borderRadius: '50%',
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: '#fff',
                    border: '6px solid #A1887F',
                    color: '#3E2723',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                }}
            >
                <NotInterestedIcon />
            </Box>
        )
    }

    return (
        <Box
            sx={{
                borderRadius: '50%',
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: '#fff',
                border: '6px solid rgb(220, 220, 222)',
                color: 'rgb(115, 114, 120)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0,
            }}
        >
            <FiberManualRecordIcon />
        </Box>
    )
}
