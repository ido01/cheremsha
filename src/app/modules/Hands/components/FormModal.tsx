import { LoadingButton } from '@mui/lab'
import { Box, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ERole, EStatus } from 'types'
import * as yup from 'yup'

import { handsActions } from '../slice'
import { selectForm } from '../slice/selectors'

export const FormModal: React.FC = () => {
    const dispatch = useDispatch()

    const { data, status, open } = useSelector(selectForm)

    const validationSchema = yup.object({
        key_name: yup.string().required(),
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
                    handsActions.updateHand({
                        ...values,
                    })
                )
            } else {
                dispatch(
                    handsActions.createHand({
                        ...values,
                    })
                )
            }
        },
    })

    const handleClose = () => {
        dispatch(handsActions.hideEditModal())
    }

    return (
        <Modal open={open} title={data.id ? 'Редактирование Роли' : 'Создание Роли'} handleClose={handleClose}>
            <Box
                noValidate
                component="form"
                onSubmit={(e: React.FormEvent) => {
                    e.preventDefault()

                    formik.handleSubmit()
                }}
                py={11}
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
                            gap: 2,
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Кодовое название роли"
                            name="key_name"
                            value={formik.values.key_name || ''}
                            error={!!formik.errors.key_name}
                            onChange={formik.handleChange}
                        />

                        <FormControl fullWidth variant="outlined" error={!!formik.errors?.role}>
                            <InputLabel>Доступ по умолчанию</InputLabel>
                            <Select
                                value={formik.values.role || ERole.GUEST}
                                label="Роль"
                                onChange={(e) => {
                                    const { value } = e.target

                                    formik.setFieldValue('role', value)
                                }}
                            >
                                {[
                                    {
                                        value: ERole.USER,
                                        label: 'Пользователь',
                                    },
                                    {
                                        value: ERole.ADMIN,
                                        label: 'Администратор',
                                    },
                                    {
                                        value: ERole.SUDO,
                                        label: 'Суперпользователь',
                                    },
                                ].map((position, index) => (
                                    <MenuItem key={index} value={position.value}>
                                        {position.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            label="Описание"
                            name="description"
                            value={formik.values.description || ''}
                            error={!!formik.errors.description}
                            onChange={formik.handleChange}
                        />
                    </Box>
                </Container>
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    bottom: 0,
                    py: 2,
                    bgcolor: 'white',
                    zIndex: 1,
                }}
            >
                <Container>
                    <LoadingButton
                        loading={status === EStatus.PENDING}
                        fullWidth
                        variant="contained"
                        onClick={() => formik.handleSubmit()}
                    >
                        Сохранить
                    </LoadingButton>
                </Container>
            </Box>
        </Modal>
    )
}
