import {
    AddCircle as AddCircleIcon,
    DeleteForever as DeleteForeverIcon,
    Edit as EditIcon,
    ForwardToInbox as ForwardToInboxIcon,
    Groups as GroupsIcon,
    PlaylistAddCheck as PlaylistAddCheckIcon,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import { SettingsModal } from 'app/components/SettingsModal'
import { categoriesActions } from 'app/modules/Categories/slice'
import { CategoryForm } from 'app/modules/Categories/templates/CategoryForm'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ICategory } from 'types/ICategory'

import { matrixActions } from '../slice'
import { initMatrix } from '../slice/constants'

interface MatrixAdminSettingsProps {
    open: boolean
    id?: string
    category?: ICategory
    handleClose: () => void
}

export const MatrixAdminSettings: React.FC<MatrixAdminSettingsProps> = ({ id, category, open, handleClose }) => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const [openDelete, setOpenDelete] = useState<boolean>(false)

    const addMatrix = () => {
        dispatch(
            matrixActions.openEditModal({
                ...initMatrix,
                parentId: id || '0',
            })
        )
    }

    const handleUpdateCategory = () => {
        if (category) {
            dispatch(categoriesActions.openModal(category))
        }
    }

    const handleShowDeleteCategory = () => {
        setOpenDelete(true)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleDeleteCategory = () => {
        if (id) {
            dispatch(categoriesActions.deleteCategory(id))
            history('/matrix')
        }
        setOpenDelete(false)
    }

    const handleStockAll = () => {
        if (id) {
            dispatch(matrixActions.stockAll(id))
        }
    }

    const handleOpenUsersModal = () => {
        if (id) {
            dispatch(matrixActions.openUserModal(id))
        }
    }

    const handleSendMatrix = () => {
        if (id) {
            dispatch(matrixActions.openSend(id))
        }
    }

    return (
        <>
            <SettingsModal open={open} handleClose={handleClose}>
                <List>
                    <ListItem disablePadding onClick={addMatrix}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddCircleIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Добавить элемент матрицы'} />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />

                <List>
                    <ListItem disablePadding onClick={handleStockAll}>
                        <ListItemButton>
                            <ListItemIcon>
                                <PlaylistAddCheckIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Все в наличии'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={handleSendMatrix}>
                        <ListItemButton>
                            <ListItemIcon>
                                <ForwardToInboxIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Отправить список'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={handleOpenUsersModal}>
                        <ListItemButton>
                            <ListItemIcon>
                                <GroupsIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Редактировать получателей'} />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />

                <List>
                    <ListItem disablePadding onClick={handleUpdateCategory}>
                        <ListItemButton>
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Редактировать категорию'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={handleShowDeleteCategory}>
                        <ListItemButton>
                            <ListItemIcon>
                                <DeleteForeverIcon />
                            </ListItemIcon>

                            <ListItemText primary={'Удалить категорию'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </SettingsModal>

            <CategoryForm />

            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                <DialogContent>
                    <DialogContentText>{`Вы уверены, что хотите удалить катеорию ${category?.name}?`}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton onClick={handleDeleteCategory} autoFocus color="error">
                        Удалить
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
