import { AddCircle as AddCircleIcon } from '@mui/icons-material'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { SettingsModal } from 'app/components/SettingsModal'
import React from 'react'
import { useDispatch } from 'react-redux'

import { handsActions } from '../slice'
import { initHand } from '../slice/constants'

interface SettingsProps {
    open: boolean
    handleClose: () => void
}

export const Settings: React.FC<SettingsProps> = ({ open, handleClose }) => {
    const dispatch = useDispatch()

    const addHand = () => {
        dispatch(handsActions.openEditModal(initHand))
    }

    return (
        <SettingsModal open={open} handleClose={handleClose}>
            <List>
                <ListItem disablePadding onClick={addHand}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AddCircleIcon />
                        </ListItemIcon>

                        <ListItemText primary="Добавить роль" />
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider />
        </SettingsModal>
    )
}
