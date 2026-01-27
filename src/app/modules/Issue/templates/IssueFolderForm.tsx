import 'dayjs/locale/ru'

import { LoadingButton } from '@mui/lab'
import {
    Box,
    Button,
    Chip,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Modal } from 'app/components/Modal'
import { TextAreaEdit } from 'app/modules/Documents/components/TextAreaEdit'
import dayjs, { Dayjs } from 'dayjs'
import { useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { EStatus } from 'types'
import * as yup from 'yup'

import { issuesActions } from '../slice'
import { priorities } from '../slice/constants'
import { selectForm, selectIssueById } from '../slice/selectors'
import { idGenerate, urlGenerate } from '../slice/utils'

export const IssueFolderForm: React.FC = () => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const { open, status, data } = useSelector(selectForm)

    const [tags, setTags] = useState('')
    const [tagsList, setTagsList] = useState<string[]>([])
    const [endDate, setEndDate] = useState<Dayjs | null>(
        data.deadtimeFormAt ? dayjs(data.deadtimeFormAt.split('.').reverse().join('-')) : null
    )

    const getParent = useSelector(selectIssueById)
    const parent = getParent(data.parent_id)

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
        grade: yup.number(),
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
                        deadtime_at: endDate?.isValid()
                            ? moment(typeof endDate === 'string' ? endDate : endDate.format())
                                  .add(1, 'd')
                                  .unix()
                            : 0,
                    })
                )
            } else {
                dispatch(
                    issuesActions.createIssue({
                        ...values,
                        deadtime_at: endDate?.isValid()
                            ? moment(typeof endDate === 'string' ? endDate : endDate.format())
                                  .add(1, 'd')
                                  .unix()
                            : 0,
                    })
                )
            }
        },
    })

    const handleLinkClick = () => {
        if (parent) {
            history(urlGenerate(parent))
        }
    }

    const keyPress = (e: any) => {
        if (e.keyCode == 13 && tags) {
            formik.setFieldValue('tags', `${formik.values.tags ? `${formik.values.tags};` : ''}${tags}`)
            setTags('')
        }
    }

    const handleDeleteTag = (deleteTag: string) => {
        const tmp = tagsList.filter((tag) => tag !== deleteTag)
        formik.setFieldValue('tags', tmp.join(';'))
    }

    useEffect(() => {
        const tmp = formik?.values?.tags?.split(';').filter((tag) => !!tag)
        if (Array.isArray(tmp)) {
            setTagsList(tmp)
        } else {
            setTagsList([])
        }
    }, [formik?.values?.tags])

    useEffect(() => {
        setEndDate(data.deadtimeFormAt ? dayjs(data.deadtimeFormAt.split('.').reverse().join('-')) : null)
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
                            gap: 3,
                        }}
                    >
                        {parent && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography variant="caption">Родительская задача</Typography>
                                <Button variant="text" onClick={handleLinkClick}>
                                    {idGenerate(parent)}
                                </Button>
                            </Box>
                        )}
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

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: 2,
                            }}
                        >
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Приоритет</InputLabel>

                                <Select
                                    value={formik.values.priority || 0}
                                    label="Приоритет"
                                    onChange={(e) => {
                                        const { value } = e.target

                                        formik.setFieldValue('priority', value)
                                    }}
                                >
                                    {priorities.map((item) => (
                                        <MenuItem key={item.value} value={item.value}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5,
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: '12px',
                                                        height: '12px',
                                                        borderRadius: 1,
                                                        backgroundColor: item.color,
                                                    }}
                                                ></Box>

                                                {item.label}
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <DatePicker
                                slotProps={{
                                    field: { clearable: true },
                                }}
                                label={'Ожидаемый срок выполнения'}
                                value={endDate}
                                onChange={(val) => {
                                    setEndDate(val)
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0,
                            }}
                        >
                            <Typography variant="caption">Метки</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'center',
                                }}
                            >
                                {tagsList.map((tag, index) => (
                                    <Chip key={index} label={tag} onDelete={() => handleDeleteTag(tag)} />
                                ))}
                                <TextField
                                    size="small"
                                    variant="outlined"
                                    label="Метки"
                                    name="tags"
                                    InputProps={{
                                        disableUnderline: true,
                                        sx: {
                                            borderRadius: '8px',
                                        },
                                    }}
                                    value={tags || ''}
                                    onKeyDown={keyPress}
                                    onChange={(e: any) => {
                                        const { value } = e.target
                                        setTags(value)
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 0,
                            }}
                        >
                            <Typography variant="caption">Описание</Typography>
                            <TextAreaEdit
                                value={formik.values.description}
                                onChange={(e) => {
                                    formik.setFieldValue('description', e)
                                }}
                            />
                        </Box>

                        <TextField
                            fullWidth
                            variant="outlined"
                            label={`Стоимость (${data.grade_name})`}
                            helperText="Оставить пустым, если будут дочерние задачи"
                            name="grade"
                            InputProps={{
                                disableUnderline: true,
                                sx: {
                                    borderRadius: '8px',
                                },
                            }}
                            value={formik.values.grade || ''}
                            error={!!formik.errors.grade}
                            onChange={formik.handleChange}
                        />
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
                    {data.id ? 'Обновить' : 'Создать'}
                </LoadingButton>
            </Box>
        </Modal>
    )
}
