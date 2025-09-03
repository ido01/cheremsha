import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'

import { achieveUserActions } from '../slice'
import { selectDeleteModal } from '../slice/selectors'

export const DeleteModal: React.FC = () => {
    const dispatch = useDispatch()

    const { open: openDelete, data: deleteAchieve, status: deleteStatus } = useSelector(selectDeleteModal)

    const handleCloseDelete = () => {
        dispatch(achieveUserActions.closeDeleteModal())
    }

    const handleDeleteCategory = () => {
        if (deleteAchieve.user) {
            dispatch(achieveUserActions.deleteAchieve(deleteAchieve.user))
        }
    }

    return (
        <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

            <DialogContent>
                <DialogContentText>{`Вы уверены, что хотите удалить награду ${deleteAchieve.label} у пользователя?`}</DialogContentText>
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
