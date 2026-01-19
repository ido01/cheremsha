import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, Typography } from '@mui/material'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React from 'react'
import { useDispatch } from 'react-redux'
import { IIssue, TCollapseKey } from 'types/IIssue'

import { issuesActions } from '../slice'

interface Props {
    open: boolean
    issue?: IIssue
    onCollapse: (value: TCollapseKey) => void
}

export const UsersRow: React.FC<Props> = ({ open, issue, onCollapse }) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        onCollapse('authors')
    }

    const handleExecutor = () => {
        if (issue) {
            dispatch(issuesActions.showFindModal(issue))
        }
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
                <Typography variant="caption">Люди</Typography>
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
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="caption">Автор:</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            gap: 1,
                            px: 1,
                            py: 0,
                        }}
                    >
                        <Typography variant="body2">{`${issue.author?.last_name} ${issue.author?.name}`}</Typography>

                        <AvatarImage
                            name={`${issue.author?.last_name} ${issue.author?.name}`}
                            image={issue.author?.avatar?.thumb}
                            size={30}
                        />
                    </Box>
                </Box>

                {issue.type === 'task' && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="caption">Исполнитель:</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                gap: 1,
                                px: 1,
                                py: 0,
                                cursor: 'pointer',
                                borderRadius: 2,
                                backgroundColor: '#fafafa',
                                border: '1px solid #f0f0f0',
                                ':hover': {
                                    backgroundColor: '#f0f0f0',
                                },
                            }}
                            onClick={handleExecutor}
                        >
                            {issue.executor ? (
                                <>
                                    <Typography variant="body2">{`${issue.executor.last_name} ${issue.executor.name}`}</Typography>

                                    <AvatarImage
                                        name={`${issue.executor.last_name} ${issue.executor.name}`}
                                        image={issue.executor.avatar?.thumb}
                                        size={30}
                                    />
                                </>
                            ) : (
                                <>
                                    <Typography variant="body2">{`Назначить`}</Typography>

                                    <AvatarImage name={``} size={30} />
                                </>
                            )}
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
