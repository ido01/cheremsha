import { LoadingButton } from '@mui/lab'
import { Box, TextField } from '@mui/material'
import { ProfileAvatar } from 'app/modules/Profile/components/ProfileAvatar'
import { useFormik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IComment } from 'types/IComment'
import * as yup from 'yup'

import { commentsActions } from '../slice'
import { commentInit } from '../slice/constants'
import { selectForm } from '../slice/selectors'

interface Props {
    oid: string
    type: string
    comment?: IComment
    handleSubmit?: () => void
}

export const CommentForm: React.FC<Props> = ({ oid, type, comment, handleSubmit }) => {
    const dispatch = useDispatch()
    const [status, setStatus] = useState(EStatus.INITIAL)
    const { status: requestStatus } = useSelector(selectForm)

    const data = useMemo(() => {
        if (comment) {
            return comment
        }
        return {
            ...commentInit,
            oid,
            type,
        }
    }, [oid, type, comment])

    useEffect(() => {
        if (status === EStatus.PENDING && (requestStatus === EStatus.INITIAL || requestStatus === EStatus.FINISHED)) {
            setStatus(requestStatus)
            formik.setFieldValue('text', '')
            handleSubmit?.()
        }
    }, [requestStatus])

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
            setStatus(EStatus.PENDING)
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
        <Box
            noValidate
            component="form"
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault()

                formik.handleSubmit()
            }}
            sx={{
                display: 'flex',
                gap: 1,
                p: 1,
            }}
        >
            <ProfileAvatar />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 1,
                    width: '100%',
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

                <LoadingButton
                    variant="contained"
                    fullWidth
                    sx={{ borderRadius: 8, width: 'fit-content' }}
                    loading={status === EStatus.PENDING}
                    disabled={!formik.values.text}
                    onClick={() => formik.handleSubmit()}
                >
                    {data.id ? 'Сохранить' : 'Отправить'}
                </LoadingButton>
            </Box>
        </Box>
    )
}
