import { AddBox as AddBoxIcon } from '@mui/icons-material'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { SettingsModal } from 'app/components/SettingsModal'
import { categoriesActions } from 'app/modules/Categories/slice'
import { CategoryForm } from 'app/modules/Categories/templates/CategoryForm'
import React from 'react'
import { useDispatch } from 'react-redux'

import { issuesActions } from '../slice'
import { issueInit } from '../slice/constants'

interface IssuesSettingsProps {
    open: boolean
    handleClose: () => void
}

export const IssuesSettings: React.FC<IssuesSettingsProps> = ({ open, handleClose }) => {
    const dispatch = useDispatch()

    const handleAddFolder = () => {
        dispatch(issuesActions.openEditModal(issueInit))
    }

    return (
        <>
            <SettingsModal open={open} handleClose={handleClose}>
                <List>
                    <ListItem disablePadding onClick={handleAddFolder}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddBoxIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Добавить Доску'} />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />
            </SettingsModal>

            <CategoryForm />
        </>
    )
}
