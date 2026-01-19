import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, Typography } from '@mui/material'
import { Comments } from 'app/modules/Comments/templates/Comments'
import React, { useEffect, useState } from 'react'
import { IIssue, TCollapseKey } from 'types/IIssue'

interface Props {
    open: boolean
    issue?: IIssue
    onCollapse: (value: TCollapseKey) => void
}

export const CommentsRow: React.FC<Props> = ({ open, issue, onCollapse }) => {
    const [isInit, setInit] = useState(false)
    const handleClick = () => {
        onCollapse('comments')
    }

    useEffect(() => {
        if (open) {
            setInit(true)
        }
    }, [open])

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
                <Typography variant="caption">Комментарии</Typography>
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
                {isInit && <Comments oid={issue.id} type={issue.type} />}
            </Box>
        </Box>
    )
}
