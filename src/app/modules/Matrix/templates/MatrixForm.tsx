import { LoadingButton } from '@mui/lab'
import { Box, Container, TextField } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { tinyUsersActions } from 'app/modules/Users/slice/tiny'
import { selectStatus } from 'app/modules/Users/slice/tiny/selectors'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import * as yup from 'yup'

import { matrixActions } from '../slice'
import { selectForm } from '../slice/selectors'

export const MatrixForm: React.FC = () => {
    const dispatch = useDispatch()

    const { data, status, find, open } = useSelector(selectForm)
    const statusUsers = useSelector(selectStatus)

    const validationSchema = yup.object({
        name: yup.string().required(),
        position: yup.number().required(),
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
                    matrixActions.updateMatrix({
                        ...values,
                    })
                )
            } else {
                dispatch(
                    matrixActions.createMatrix({
                        ...values,
                    })
                )
            }
        },
    })

    const handleClose = () => {
        dispatch(matrixActions.hideEditModal())
    }

    const handleFindPosition = () => {
        dispatch(matrixActions.findPosition(data.parentId))
    }

    useEffect(() => {
        if (statusUsers === EStatus.INITIAL) {
            dispatch(tinyUsersActions.loadUsers())
        }
    }, [])

    return (
        <Modal
            open={open}
            title={data.id ? 'Редактирование элемента матрицы' : 'Создание элемента матрицы'}
            handleClose={handleClose}
        >
            <Box
                noValidate
                component="form"
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault()

                    formik.handleSubmit()
                }}
                py={10}
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                    maxHeight: 'calc( 100% )',
                }}
            >
                <Container>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                            pt: 4,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 1fr',
                                gap: 2,
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Номер"
                                name="position"
                                value={formik.values.position || ''}
                                error={!!formik.errors.position}
                                onChange={formik.handleChange}
                            />

                            <LoadingButton
                                variant="contained"
                                fullWidth
                                loading={find === EStatus.PENDING}
                                onClick={handleFindPosition}
                            >
                                Ближайший свободный
                            </LoadingButton>
                        </Box>

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Название"
                            name="name"
                            value={formik.values.name || ''}
                            error={!!formik.errors.name}
                            onChange={formik.handleChange}
                        />
                    </Box>
                </Container>
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    bottom: '4px',
                    right: 0,
                    m: 1,
                    p: 1,
                    width: 'calc( 100% - 16px )',
                    borderRadius: 8,
                    backdropFilter: 'blur(4px)',
                    bgcolor: '#FDFDFD30',
                    border: '1px solid #F5F5F5',
                    zIndex: 2,
                }}
            >
                <LoadingButton
                    variant="outlined"
                    fullWidth
                    sx={{ borderRadius: 8 }}
                    loading={status === EStatus.PENDING}
                    onClick={() => formik.handleSubmit()}
                >
                    Сохранить
                </LoadingButton>
            </Box>
        </Modal>
    )
}
