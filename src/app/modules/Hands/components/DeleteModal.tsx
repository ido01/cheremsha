import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'

import { handsActions } from '../slice'
import { selectDeleteModal } from '../slice/selectors'

export const DeleteModal: React.FC = () => {
    const dispatch = useDispatch()

    const { open, data, status } = useSelector(selectDeleteModal)

    const handleCloseDelete = () => {
        dispatch(handsActions.closeDeleteModal())
    }

    const handleDelete = () => {
        dispatch(handsActions.deleteHand(data.id))
    }

    return (
        <Dialog open={open} onClose={handleCloseDelete}>
            <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

            <DialogContent>
                <DialogContentText>{`Вы уверены, что хотите удалить такую роль, как ${data.key_name}?`}</DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCloseDelete} color="primary">
                    Отмена
                </Button>

                <LoadingButton loading={status === EStatus.PENDING} onClick={handleDelete} autoFocus color="error">
                    Удалить
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}
