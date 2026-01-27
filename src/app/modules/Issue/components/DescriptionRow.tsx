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

export const DescriptionRow: React.FC<Props> = ({ open, issue, onCollapse }) => {
    const handleClick = () => {
        onCollapse('description')
    }

    if (!issue || !issue.description) {
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
                <Typography variant="caption">Описание</Typography>
                {open ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />}
            </Box>
            <Box
                sx={{
                    maxHeight: open ? '1000vh' : '0px',
                    overflow: 'hidden',
                    transition: '0.1s',
                    backgroundColor: '#fafafa',
                    py: open ? 1 : 0,
                    px: open ? 2 : 0,
                    borderRadius: 1,
                }}
            >
                <Typography variant="body2" sx={{ mt: '-8px' }}>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: issue.description,
                        }}
                    />
                </Typography>
            </Box>
        </Box>
    )
}
