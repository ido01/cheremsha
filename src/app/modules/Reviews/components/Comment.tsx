import { LoadingButton } from '@mui/lab'
import { Box, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { EStatus } from 'types'
import { IReview } from 'types/IReview'
import * as yup from 'yup'

import { reviewsActions } from '../slice'

interface CommentProps {
    review: IReview
}

export const Comment: React.FC<CommentProps> = ({ review }) => {
    const dispatch = useDispatch()

    const validationSchema = yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
    })

    const formik = useFormik({
        validationSchema,
        initialValues: review,
        validateOnBlur: true,
        validateOnChange: true,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (values.id) {
                dispatch(
                    reviewsActions.updateReview({
                        ...values,
                    })
                )
            } else {
                dispatch(
                    reviewsActions.commentReview({
                        ...values,
                    })
                )
            }
        },
    })

    return (
        <Box
            noValidate
            component="form"
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault()

                formik.handleSubmit()
            }}
            sx={{
                flexGrow: 1,
                display: 'flex',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    flexGrow: 0,
                    width: '100%',
                }}
            >
                <Typography variant="body1" fontWeight={600}>
                    Ответить
                </Typography>

                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    label={'Ваш комметарий'}
                    name="description"
                    value={formik.values.description || ''}
                    error={!!formik.errors.description}
                    onChange={formik.handleChange}
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                    }}
                >
                    <LoadingButton
                        loading={status === EStatus.PENDING}
                        variant="contained"
                        onClick={() => formik.handleSubmit()}
                    >
                        Ответить
                    </LoadingButton>
                </Box>
            </Box>
        </Box>
    )
}
