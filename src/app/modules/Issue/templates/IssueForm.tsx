import { LoadingButton } from '@mui/lab'
import { Box, Container, Grid, TextField } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { useFormik } from 'formik'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import * as yup from 'yup'

import { issuesActions } from '../slice'
import { selectForm } from '../slice/selectors'

export const IssueForm: React.FC = () => {
    const dispatch = useDispatch()
    const { open, status, data } = useSelector(selectForm)

    const title = useMemo(() => {
        if (data.id) {
            return data.type === 'folder' ? 'Редактировать Доску' : 'Редактировать Задачу'
        } else {
            return data.type === 'folder' ? 'Создать Доску' : 'Создать Задачу'
        }
    }, [data])

    const handleClose = () => {
        dispatch(issuesActions.hideEditModal())
    }

    const validationSchema = yup.object({
        title: yup.string().required(),
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
                    issuesActions.updateIssue({
                        ...values,
                    })
                )
            } else {
                dispatch(
                    issuesActions.createIssue({
                        ...values,
                    })
                )
            }
        },
    })

    return (
        <Modal open={open} title={title} handleClose={handleClose}>
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
                            gap: 2,
                        }}
                    >
                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            label="Название"
                            name="title"
                            InputProps={{
                                disableUnderline: true,
                                sx: {
                                    borderRadius: '8px',
                                },
                            }}
                            value={formik.values.title || ''}
                            error={!!formik.errors.title}
                            onChange={formik.handleChange}
                        />

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Описание"
                            name="description"
                            rows={2}
                            multiline
                            InputProps={{
                                disableUnderline: true,
                                sx: {
                                    borderRadius: '8px',
                                },
                            }}
                            value={formik.values.description || ''}
                            error={!!formik.errors.description}
                            onChange={formik.handleChange}
                        />

                        <TextField
                            fullWidth
                            required
                            variant="outlined"
                            label="Значение стоимости"
                            name="grade_name"
                            InputProps={{
                                disableUnderline: true,
                                sx: {
                                    borderRadius: '8px',
                                },
                            }}
                            value={formik.values.grade_name || ''}
                            error={!!formik.errors.grade_name}
                            onChange={formik.handleChange}
                        />

                        <Grid container columnSpacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Ключ доступа к просмотру"
                                    name="access_view"
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {
                                            borderRadius: '8px',
                                        },
                                    }}
                                    helperText="Введите user, admin, sudo или уникальный ключ"
                                    value={formik.values.access_view || ''}
                                    error={!!formik.errors.access_view}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    variant="outlined"
                                    label="Ключ доступа к редактированию"
                                    name="access_update"
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {
                                            borderRadius: '8px',
                                        },
                                    }}
                                    helperText="Введите user, admin, sudo или уникальный ключ"
                                    value={formik.values.access_update || ''}
                                    error={!!formik.errors.access_update}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box mt={2}>
                        {/* <DatePicker
                            label={'Дата удаления документа'}
                            // inputFormat="dd.MM.yyyy"
                            // mask="__.__.____"
                            value={endDate}
                            onChange={(val) => {
                                setEndDate(val)
                            }}
                            // renderInput={(params) => <TextField fullWidth variant="outlined" {...params} />}
                        /> */}
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
