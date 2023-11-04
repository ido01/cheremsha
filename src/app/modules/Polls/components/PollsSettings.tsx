import { Replay as ReplayIcon } from '@mui/icons-material'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { SettingsModal } from 'app/components/SettingsModal'
import React from 'react'
import { useDispatch } from 'react-redux'

import { pollsActions } from '../slice'

interface PollsSettingsProps {
    open: boolean
    handleClose: () => void
}

export const PollsSettings: React.FC<PollsSettingsProps> = ({ open, handleClose }) => {
    const dispatch = useDispatch()

    const handleReloadPoll = () => {
        dispatch(pollsActions.reloadPolls())
        handleClose()
    }

    return (
        <>
            <SettingsModal open={open} handleClose={handleClose}>
                <List>
                    <ListItem disablePadding onClick={handleReloadPoll}>
                        <ListItemButton>
                            <ListItemIcon>
                                <ReplayIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Пересобрать статистику'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </SettingsModal>
        </>
    )
}
