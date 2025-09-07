import { LoadingButton } from '@mui/lab'
import {
    Box,
    Container,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
} from '@mui/material'
import { Modal } from 'app/components/Modal'
import { useFormik } from 'formik'
import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import * as yup from 'yup'

import { reviewsActions } from '../slice'
import { selectForm } from '../slice/selectors'

const types = [
    {
        value: 'revision',
        label: 'Предложение к улучшению',
    },
    {
        value: 'error',
        label: 'Найдена ошибка',
    },
]

export const FormModal: React.FC = () => {
    const dispatch = useDispatch()

    const { data, status, open } = useSelector(selectForm)

    const validationSchema = yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
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
                    reviewsActions.updateReview({
                        ...values,
                    })
                )
            } else {
                dispatch(
                    reviewsActions.createReview({
                        ...values,
                    })
                )
            }
        },
    })

    const handleClose = () => {
        dispatch(reviewsActions.hideEditModal())
    }

    return (
        <Modal open={open} title={data.id ? 'Редактирование Отзыва' : 'Создание Отзыва'} handleClose={handleClose}>
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
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formik.values.anon}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            formik.setFieldValue('anon', event.target.checked)
                                        }}
                                    />
                                }
                                label="Отправить анонимно"
                            />
                            <FormControl fullWidth variant="outlined" error={!!formik.errors?.type}>
                                <InputLabel>Тип обращения</InputLabel>

                                <Select
                                    value={formik.values.type}
                                    label="Тип"
                                    onChange={(e) => {
                                        const { value } = e.target

                                        formik.setFieldValue('type', value)
                                    }}
                                >
                                    {types.map((type, index) => {
                                        return (
                                            <MenuItem key={index} value={type.value}>
                                                {type.label}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Box>

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Короткое описание"
                            name="title"
                            value={formik.values.title || ''}
                            error={!!formik.errors.title}
                            onChange={formik.handleChange}
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            label={
                                formik.values.type === 'error'
                                    ? 'Опишите подробнее проблему'
                                    : 'Опишите подробнее ваше предложение по улучшению'
                            }
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
