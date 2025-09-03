import { AddCircle as AddCircleIcon } from '@mui/icons-material'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { SettingsModal } from 'app/components/SettingsModal'
import React from 'react'
import { useDispatch } from 'react-redux'

import { achieveActions } from '../slice'

interface SettingsProps {
    open: boolean
    handleClose: () => void
}

export const Settings: React.FC<SettingsProps> = ({ open, handleClose }) => {
    const dispatch = useDispatch()

    const addPosition = () => {
        dispatch(
            achieveActions.openEditModal({
                id: '',
                icon: 'AccessTimeFilled',
                color: '#4CAF50',
                label: '',
                fid: '',
                description: '',
                order_row: 1,
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

                        <ListItemText primary="Добавить ачивку" />
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider />
        </SettingsModal>
    )
}
