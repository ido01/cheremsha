import {
    Delete as DeleteIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Modal } from 'app/components/Modal'
import { ImageUploadForm } from 'app/modules/File/templates/ImageUploadForm'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { TEventInfoType } from 'types/IEventInfo'
import * as yup from 'yup'

import { TextAreaEdit } from '../components/TextAreaEdit'
import { eventsActions } from '../slice/events'
import { selectForm } from '../slice/events/selectors'

export const EventForm: React.FC = () => {
    const dispatch = useDispatch()

    const { data, status, open } = useSelector(selectForm)

    const validationSchema = yup.object({
        name: yup.string().required(),
        eventDate: yup.string().required(),
        prioritet: yup.string().required(),
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
                    eventsActions.updateEvent({
                        ...values,
                        eventDate: moment(values.eventDate).format('yyyy-MM-DD'),
                        info: values.info.map((info, index) => ({
                            ...info,
                            sort: index,
                        })),
                    })
                )
            } else {
                dispatch(
                    eventsActions.createEvent({
                        ...values,
                        eventDate: moment(values.eventDate).format('yyyy-MM-DD'),
                        info: values.info.map((info, index) => ({
                            ...info,
                            sort: index,
                        })),
                    })
                )
            }
        },
    })

    const handleClose = () => {
        dispatch(eventsActions.hideEditModal())
    }

    const handleAddInfo = (type: TEventInfoType) => {
        dispatch(
            eventsActions.openEditModal({
                ...formik.values,
                info: [
                    ...formik.values.info,
                    {
                        id: '',
                        type,
                        parentId: '0',
                        text: '',
                        fid: '',
                        sort: formik.values.info.length,
                        createdAt: '',
                    },
                ],
            })
        )
    }

    const handleRemoveInfo = (index: number, id: string) => {
        if (!id) {
            dispatch(
                eventsActions.openEditModal({
                    ...formik.values,
                    info: [...formik.values.info.filter((_, i) => index !== i)],
                })
            )
        } else {
            dispatch(
                eventsActions.openEditModal({
                    ...formik.values,
                    info: formik.values.info.map((info, i) => {
                        if (i !== index) return info
                        return {
                            ...info,
                            type: 'delete',
                        }
                    }),
                })
            )
        }
    }

    const handleUpInfo = (index: number) => {
        dispatch(
            eventsActions.openEditModal({
                ...formik.values,
            })
        )
        dispatch(eventsActions.moveUpInfo(index))
    }

    const handleDownInfo = (index: number) => {
        dispatch(
            eventsActions.openEditModal({
                ...formik.values,
            })
        )
        dispatch(eventsActions.moveDownInfo(index))
    }

    return (
        <Modal open={open} title={data.id ? 'Редактирование события' : 'Создание события'} handleClose={handleClose}>
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
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Название"
                        name="name"
                        value={formik.values.name || ''}
                        error={!!formik.errors.name}
                        onChange={formik.handleChange}
                    />

                    <Box mt={2}>
                        <DatePicker
                            label="Дата события"
                            value={dayjs(formik.values.eventDate)}
                            onChange={(val) => {
                                if (val) {
                                    formik.setFieldValue('eventDate', val?.format('YYYY-MM-DD'))
                                }
                            }}
                        />
                    </Box>

                    <Box mt={2}>
                        <FormControl fullWidth variant="outlined" error={!!formik.errors?.prioritet}>
                            <InputLabel>Важность</InputLabel>
                            <Select
                                value={formik.values.prioritet || ''}
                                label="Важность"
                                onChange={(e) => {
                                    const { value } = e.target

                                    formik.setFieldValue('prioritet', value)
                                }}
                            >
                                {[
                                    {
                                        label: 'Нормальный',
                                        value: 'normal',
                                    },
                                    {
                                        label: 'Высокий',
                                        value: 'hight',
                                    },
                                ].map((gender, index) => (
                                    <MenuItem key={index} value={gender.value}>
                                        {gender.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {formik.values.info
                        .filter((info) => info.type !== 'delete')
                        .map((info, index) => (
                            <Box key={index} display={'flex'} mt={2} alignItems={'flex-start'}>
                                {info.type === 'title' && (
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Подзаголовок"
                                        name={`info.${index}.text`}
                                        value={formik.values.info[index].text || ''}
                                        onChange={formik.handleChange}
                                    />
                                )}

                                {info.type === 'video' && (
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        variant="outlined"
                                        label="Код видео"
                                        name={`info.${index}.text`}
                                        value={formik.values.info[index].text || ''}
                                        onChange={formik.handleChange}
                                    />
                                )}

                                {info.type === 'text' && (
                                    <TextAreaEdit
                                        value={data.info[index]?.text || ''}
                                        onChange={(value: string) => {
                                            formik.setFieldValue(`info.${index}.text`, value)
                                        }}
                                    />
                                )}

                                {info.type === 'image' && (
                                    <Box flex="1 0 0%">
                                        {!info.image ? (
                                            <ImageUploadForm index={index} />
                                        ) : (
                                            <Box component={'img'} src={info.image.url} maxWidth="100%" />
                                        )}
                                    </Box>
                                )}

                                <Box display={'flex'} flexDirection={'column'} sx={{ ml: 2 }}>
                                    <IconButton disabled={index === 0} onClick={() => handleUpInfo(index)}>
                                        <KeyboardArrowUpIcon />
                                    </IconButton>

                                    <IconButton
                                        disabled={
                                            formik.values.info.filter((info) => info.type !== 'delete').length ===
                                            index + 1
                                        }
                                        onClick={() => handleDownInfo(index)}
                                    >
                                        <KeyboardArrowDownIcon />
                                    </IconButton>
                                    {info.type === 'image' && <ImageUploadForm isEdit index={index} />}
                                    <IconButton color="error" onClick={() => handleRemoveInfo(index, info.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}

                    <ButtonGroup fullWidth size="small" sx={{ my: 5 }}>
                        <Button onClick={() => handleAddInfo('title')}>Добавить Заголовок</Button>
                        <Button onClick={() => handleAddInfo('text')}>Добавить текст</Button>
                        <Button onClick={() => handleAddInfo('video')}>Добавить видео</Button>
                        <Button
                            disabled={
                                formik.values.info.filter((item) => item.type === 'image' && item.fid === '').length > 0
                            }
                            onClick={() => handleAddInfo('image')}
                        >
                            Добавить картинку
                        </Button>
                    </ButtonGroup>
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
