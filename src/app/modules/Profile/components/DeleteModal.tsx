import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'

import { profileActions } from '../slice'
import { selectDeleteModal } from '../slice/selectors'

export const DeleteModal: React.FC = () => {
    const dispatch = useDispatch()

    const { open: openDelete, status: deleteStatus } = useSelector(selectDeleteModal)

    const handleCloseDelete = () => {
        dispatch(profileActions.closeDeleteModal())
    }

    const handleDeleteCategory = () => {
        dispatch(profileActions.deleteTelegram())
    }

    return (
        <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

            <DialogContent>
                <DialogContentText>{`Вы уверены, что хотите отвязать с telegram аккаунт?`}</DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCloseDelete} color="primary">
                    Отмена
                </Button>

                <LoadingButton
                    loading={deleteStatus === EStatus.PENDING}
                    onClick={handleDeleteCategory}
                    autoFocus
                    color="error"
                >
                    Удалить
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}
