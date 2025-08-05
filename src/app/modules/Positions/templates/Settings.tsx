import { AddCircle as AddCircleIcon } from '@mui/icons-material'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { SettingsModal } from 'app/components/SettingsModal'
import React from 'react'
import { useDispatch } from 'react-redux'

import { positionsActions } from '../slice'

interface SettingsProps {
    open: boolean
    handleClose: () => void
}

export const Settings: React.FC<SettingsProps> = ({ open, handleClose }) => {
    const dispatch = useDispatch()

    const addPosition = () => {
        dispatch(
            positionsActions.openEditModal({
                id: '',
                label: '',
            })
        )
    }

    return (
        <SettingsModal open={open} handleClose={handleClose}>
            <List>
                <ListItem disablePadding onClick={addPosition}>
                    <ListItemButton>
                        <ListItemIcon>
                            <AddCircleIcon />
                        </ListItemIcon>

                        <ListItemText primary="Добавить должность" />
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider />
        </SettingsModal>
    )
}
