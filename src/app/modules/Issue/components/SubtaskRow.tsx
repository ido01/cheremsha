import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { TCollapseKey } from 'types/IIssue'

import { FolderList } from './FolderList'

interface Props {
    isInit: boolean
    open: boolean
    id: string
    onCollapse: (value: TCollapseKey) => void
}

export const SubtaskRow: React.FC<Props> = ({ isInit, open, id, onCollapse }) => {
    const handleClick = () => {
        onCollapse('subTasks')
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    cursor: 'pointer',
                }}
                onClick={handleClick}
            >
                <Typography variant="caption">Подзадачи</Typography>
                {open ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />}
            </Box>

            <Box
                sx={{
                    // p: open ? 1 : 0,
                    // border: open ? '1px solid #f0f0f0' : '0px',
                    maxHeight: open ? '1000vh' : '0px',
                    overflow: 'hidden',
                    transition: '0.1s',
                    borderRadius: 1,
                }}
            >
                {isInit && <FolderList id={id} />}
            </Box>
        </Box>
    )
}
