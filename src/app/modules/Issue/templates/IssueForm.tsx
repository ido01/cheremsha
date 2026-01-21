import { LoadingButton } from '@mui/lab'
import { Autocomplete, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { HandForm } from 'app/modules/Hands/components/HandForm'
import { handsActions } from 'app/modules/Hands/slice'
import { selectHands } from 'app/modules/Hands/slice/selectors'
import { useFormik } from 'formik'
import useDebounce from 'hooks/useDebounce'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IHand } from 'types/IHand'
import { generateRole } from 'utils/generateRole'
import * as yup from 'yup'

import { issuesActions } from '../slice'
import { selectForm } from '../slice/selectors'

export const IssueForm: React.FC = () => {
    const dispatch = useDispatch()
    const { open, status, data } = useSelector(selectForm)
    const hands = useSelector(selectHands)

    const [view, setView] = useState<IHand | undefined>(data.access_view)
    const [update, setUpdate] = useState<IHand | undefined>(data.access_update)
    const [tmpSearch, setTmpSearch] = useState('')
    const search = useDebounce(tmpSearch, 1000)

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

    const handleAddRoleView = () => {
        dispatch(handsActions.openEditModal(generateRole(formik.values.title, 'issue', 'view')))
    }

    const handleAddRoleUpdate = () => {
        dispatch(handsActions.openEditModal(generateRole(formik.values.title, 'issue', 'update')))
    }

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
                        access_update_id: update?.id || '0',
                        access_view_id: view?.id || '0',
                    })
                )
            } else {
                dispatch(
                    issuesActions.createIssue({
                        ...values,
                        access_update_id: update?.id || '0',
                        access_view_id: view?.id || '0',
                    })
                )
            }
        },
    })

    useEffect(() => {
        if (!search && (data.access_view || data.access_update)) {
            const initHands = []
            if (data.access_view) {
                initHands.push(data.access_view)
            }
            if (data.access_update) {
                initHands.push(data.access_update)
            }
            dispatch(
                handsActions.handsLoaded({
                    data: initHands,
                })
            )
        } else {
            dispatch(handsActions.searchHands(search))
        }
    }, [search])

    useEffect(() => {
        if (data.access_view) {
            setView(data.access_view)
        }
        if (data.access_update) {
            setUpdate(data.access_update)
        }
    }, [data])

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
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Typography>{`Роль для просмотра`}</Typography>

                                    <Autocomplete
                                        value={view}
                                        onChange={(event, newValue) => {
                                            if (typeof newValue === 'string') {
                                                //
                                            } else if (newValue) {
                                                // Create a new value from the user input
                                                setView(newValue)
                                            }
                                        }}
                                        filterOptions={(options, params) => {
                                            setTmpSearch(params.inputValue)
                                            return hands
                                        }}
                                        selectOnFocus
                                        clearOnBlur
                                        handleHomeEndKeys
                                        options={hands}
                                        getOptionLabel={(option) => {
                                            if (typeof option === 'string') {
                                                return option
                                            }

                                            return `${option.key_name}(${option.role})`
                                        }}
                                        renderOption={(props, option) => {
                                            const { key, ...optionProps } = props
                                            return (
                                                <li key={key} {...optionProps}>
                                                    {`${option.key_name}(${option.role})`}
                                                </li>
                                            )
                                        }}
                                        sx={{ width: '100%' }}
                                        freeSolo
                                        renderInput={(params) => (
                                            <TextField {...params} label="Выбрать роль для просмотра" />
                                        )}
                                    />

                                    <Button size="small" onClick={handleAddRoleView}>
                                        Добавить роль
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Typography>{`Роль для изменений`}</Typography>

                                    <Autocomplete
                                        value={update}
                                        onChange={(event, newValue) => {
                                            if (typeof newValue === 'string') {
                                                //
                                            } else if (newValue) {
                                                // Create a new value from the user input
                                                setUpdate(newValue)
                                            }
                                        }}
                                        filterOptions={(options, params) => {
                                            setTmpSearch(params.inputValue)
                                            return hands
                                        }}
                                        selectOnFocus
                                        clearOnBlur
                                        handleHomeEndKeys
                                        options={hands}
                                        getOptionLabel={(option) => {
                                            if (typeof option === 'string') {
                                                return option
                                            }

                                            return `${option.key_name}(${option.role})`
                                        }}
                                        renderOption={(props, option) => {
                                            const { key, ...optionProps } = props
                                            return (
                                                <li key={key} {...optionProps}>
                                                    {`${option.key_name}(${option.role})`}
                                                </li>
                                            )
                                        }}
                                        sx={{ width: '100%' }}
                                        freeSolo
                                        renderInput={(params) => (
                                            <TextField {...params} label="Выбрать роль для изменений" />
                                        )}
                                    />

                                    <Button size="small" onClick={handleAddRoleUpdate}>
                                        Добавить роль
                                    </Button>
                                </Box>
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

                <HandForm />
            </Box>
        </Modal>
    )
}
