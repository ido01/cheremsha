import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IIssue } from 'types/IIssue'

import { idGenerate, urlGenerate } from '../slice/utils'
import { IssueBody } from './IssueBody'
import { Status } from './Status'
import { StatusText } from './StatusText'

interface Props {
    issue: IIssue
}

export const Issue: React.FC<Props> = ({ issue }) => {
    const history = useNavigate()
    const [open, setOpen] = useState(false)
    const [isInit, setInit] = useState(false)

    const handleLinkClick = () => {
        history(urlGenerate(issue))
    }

    const handleClick = () => {
        if (!isInit) {
            setInit(true)
        }
        setOpen((value) => !value)
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: open ? 1 : 0,
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px dotted #ddd',
                borderRadius: 4,
                overflow: 'hidden',
                transition: '0.1s',
                ':hover': {
                    border: '1px solid #ddd',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    position: 'relative',
                    gap: 1,
                    alignItems: 'center',
                    p: 1,
                    pl: 2,
                    cursor: 'pointer',
                    ...(open && {
                        backgroundColor: '#f5f5f5',
                        ':hover': {
                            backgroundColor: '#f0f0f0',
                        },
                    }),
                }}
                onClick={handleClick}
            >
                <Status status={issue.status} />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        pr: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            gap: 0,
                        }}
                    >
                        <Button
                            variant="text"
                            onClick={handleLinkClick}
                            sx={{
                                py: 0,
                                width: 'fit-content',
                            }}
                        >
                            {idGenerate(issue)}
                        </Button>

                        <Typography
                            variant="body1"
                            fontWeight={600}
                            sx={{
                                ml: 1,
                            }}
                        >
                            {issue.title}
                        </Typography>
                    </Box>

                    <StatusText status={issue.status} />
                </Box>
            </Box>

            <IssueBody id={issue.id} isInit={isInit} issue={issue} open={open} />
        </Box>
    )
}
