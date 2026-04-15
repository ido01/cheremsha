import { MoreVert as MoreVertIcon, Source as SourceIcon } from '@mui/icons-material'
import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { selectProfile } from 'app/modules/Profile/slice/selectors'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IIssue } from 'types/IIssue'

import { issuesActions } from '../slice'
import { idGenerate, issueRoleCheck, urlGenerate } from '../slice/utils'

interface Props {
    issue: IIssue
}

export const Folder: React.FC<Props> = ({ issue }) => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const checkStatickRole = useSelector(selectCheckAccess)
    const profile = useSelector(selectProfile)

    const [fullView, setFullOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleSettingOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleEdit = () => {
        dispatch(issuesActions.openEditModal(issue))
        handleClose()
    }

    const handleDelete = () => {
        dispatch(issuesActions.showDeleteModal(issue))
        handleClose()
    }

    const handleFullView = () => {
        setFullOpen(true)
    }

    const handleLinkClick = () => {
        history(urlGenerate(issue))
    }

    if (issue.type === 'task') {
        return null
    }

    return (
        <Box
            sx={{
                position: 'relative',
                py: 1,
                px: 2,
                border: '2px solid #BBDEFB',
                borderRadius: 2,
                zIndex: 1,
                cursor: 'pointer',
                transition: '0.3s',
                display: 'flex',
                gap: fullView ? 1 : 0,
                flexDirection: 'column',
                ':after': {
                    content: '""',
                    backgroundColor: fullView ? 'transparent' : '#FFF',
                    width: 'calc( 100% + 4px )',
                    height: 'calc( 100% - 24px )',
                    position: 'absolute',
                    top: '12px',
                    left: '-2px',
                    zIndex: 2,
                    transition: '0.3s',
                },
                ':before': {
                    content: '""',
                    backgroundColor: fullView ? 'transparent' : '#FFF',
                    width: 'calc( 100% - 24px )',
                    height: 'calc( 100% + 4px )',
                    position: 'absolute',
                    top: '-2px',
                    left: '12px',
                    zIndex: 2,
                    transition: '0.3s',
                },
                ':hover': {
                    ':after': {
                        top: '50%',
                        height: '0px',
                    },
                    ':before': {
                        left: '50%',
                        width: '0px',
                    },
                },
            }}
            onClick={handleFullView}
        >
            <Box
                sx={{
                    zIndex: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        gap: 0.5,
                        zIndex: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <SourceIcon sx={{ color: '#90CAF9' }} />
                        <Button variant="text" onClick={handleLinkClick}>
                            {idGenerate(issue)}
                        </Button>
                    </Box>

                    <Typography variant="body1" fontWeight={600}>
                        {issue.title}
                    </Typography>
                </Box>

                {issueRoleCheck(profile, issue.access_update, issue) && (
                    <Box
                        sx={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            zIndex: 3,
                        }}
                    >
                        <IconButton
                            sx={{ bgcolor: '#FDFDFD90' }}
                            aria-label="more"
                            id="long-button"
                            aria-haspopup="true"
                            onClick={handleSettingOpen}
                        >
                            <MoreVertIcon />
                        </IconButton>

                        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={handleEdit}>Редактировать</MenuItem>
                            <MenuItem onClick={handleDelete}>Удалить</MenuItem>
                        </Menu>
                    </Box>
                )}
            </Box>

            <Box
                sx={{
                    overflow: 'hidden',
                    height: fullView ? 'content' : '0px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0,
                    }}
                >
                    <Typography variant="caption">Описание</Typography>
                    <Typography variant="body2" sx={{ mt: '-8px' }}>
                        {issue.description}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0,
                            alignItems: 'flex-end',
                        }}
                    >
                        <Typography variant="caption">Автор</Typography>

                        <Typography
                            variant="body2"
                            sx={{ mt: '-8px' }}
                        >{`${issue.author?.last_name} ${issue.author?.name}`}</Typography>
                    </Box>

                    <AvatarImage
                        name={`${issue.author?.last_name} ${issue.author?.name}`}
                        image={issue.author?.avatar?.thumb}
                        size={30}
                    />
                </Box>
            </Box>
        </Box>
    )
}
