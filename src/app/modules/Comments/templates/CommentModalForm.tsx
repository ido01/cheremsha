import { LoadingButton } from '@mui/lab'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import * as yup from 'yup'

import { commentsActions } from '../slice'
import { selectForm } from '../slice/selectors'

export const CommentModalForm: React.FC = () => {
    const dispatch = useDispatch()
    const { open, data, status } = useSelector(selectForm)

    const handleClose = () => {
        dispatch(commentsActions.hideEditModal())
    }

    const validationSchema = yup.object({
        text: yup.string(),
    })

    const formik = useFormik({
        validationSchema,
        initialValues: data,
        validateOnBlur: true,
        validateOnChange: true,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (values.id) {
                dispatch(
                    commentsActions.updateComment({
                        ...values,
                    })
                )
            } else {
                dispatch(
                    commentsActions.createComment({
                        ...values,
                    })
                )
            }
        },
    })

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">Оставить комментарий</DialogTitle>

            <DialogContent>
                <Box
                    noValidate
                    component="form"
                    onSubmit={(e: React.FormEvent) => {
                        e.preventDefault()

                        formik.handleSubmit()
                    }}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: 1,
                        pt: 0.5,
                        width: '384px',
                        maxWidth: '90vw',
                    }}
                >
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Комметарий"
                        name="text"
                        rows={2}
                        multiline
                        InputProps={{
                            disableUnderline: true,
                            sx: {
                                borderRadius: '8px',
                            },
                        }}
                        value={formik.values.text || ''}
                        error={!!formik.errors.text}
                        onChange={formik.handleChange}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Отмена
                </Button>

                <LoadingButton
                    fullWidth
                    sx={{ borderRadius: 8, width: 'fit-content' }}
                    loading={status === EStatus.PENDING}
                    disabled={!formik.values.text}
                    color="success"
                    onClick={() => formik.handleSubmit()}
                >
                    {data.id ? 'Сохранить' : 'Отправить'}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}
