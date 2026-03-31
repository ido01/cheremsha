import 'dayjs/locale/ru'

import {
    Delete as DeleteIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Button, ButtonGroup, Container, IconButton, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Modal } from 'app/components/Modal'
import { ImageUploadForm } from 'app/modules/File/templates/ImageUploadForm'
import { tinyUsersActions } from 'app/modules/Users/slice/tiny'
import { selectStatus } from 'app/modules/Users/slice/tiny/selectors'
import dayjs, { Dayjs } from 'dayjs'
import { useFormik } from 'formik'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { TDocumentInfoType } from 'types/IDocumentInfo'
import * as yup from 'yup'

import { TextAreaEdit } from '../components/TextAreaEdit'
import { documentsActions } from '../slice'
import { selectForm } from '../slice/selectors'

export const DocumentForm: React.FC = () => {
    dayjs.locale('ru')
    const dispatch = useDispatch()

    const { data, status, open } = useSelector(selectForm)
    const statusUsers = useSelector(selectStatus)

    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(data.end_date.split('.').reverse().join('-')))
    const [deadTime, setDeadTime] = useState<Dayjs | null>(dayjs(data.deadTime.split('.').reverse().join('-')))
    setDeadTime

    const validationSchema = yup.object({
        name: yup.string().required(),
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
                    documentsActions.updateDocument({
                        ...values,
                        end_date: endDate?.isValid()
                            ? moment(typeof endDate === 'string' ? endDate : endDate.format()).format('yyyy-MM-DD')
                            : '',
                        end_date_unix: endDate?.isValid()
                            ? moment(typeof endDate === 'string' ? endDate : endDate.format())
                                  .add(1, 'd')
                                  .unix()
                            : 0,
                        deadTime: deadTime?.isValid() ? `${deadTime.add(1, 'd').unix()}` : '0',
                        info: values.info.map((info, index) => ({
                            ...info,
                            sort: index,
                        })),
                    })
                )
            } else {
                dispatch(
                    documentsActions.createDocument({
                        ...values,
                        end_date: endDate?.isValid()
                            ? moment(typeof endDate === 'string' ? endDate : endDate.format()).format('yyyy-MM-DD')
                            : '',
                        end_date_unix: endDate?.isValid()
                            ? moment(typeof endDate === 'string' ? endDate : endDate.format())
                                  .add(1, 'd')
                                  .unix()
                            : 0,
                        deadTime: deadTime?.isValid() ? `${deadTime.add(1, 'd').unix()}` : '0',
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
        dispatch(documentsActions.hideEditModal())
    }

    const handleAddInfo = (type: TDocumentInfoType) => {
        dispatch(
            documentsActions.openEditModal({
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
                documentsActions.openEditModal({
                    ...formik.values,
                    info: [...formik.values.info.filter((_, i) => index !== i)],
                })
            )
        } else {
            dispatch(
                documentsActions.openEditModal({
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
            documentsActions.openEditModal({
                ...formik.values,
            })
        )
        dispatch(documentsActions.moveUpInfo(index))
    }

    const handleDownInfo = (index: number) => {
        dispatch(
            documentsActions.openEditModal({
                ...formik.values,
            })
        )
        dispatch(documentsActions.moveDownInfo(index))
    }

    useEffect(() => {
        if (statusUsers === EStatus.INITIAL) {
            dispatch(tinyUsersActions.loadUsers())
        }
    }, [])

    return (
        <Modal
            open={open}
            title={data.id ? 'Редактирование документа' : 'Создание документа'}
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
                            label={'Дата удаления документа'}
                            value={endDate}
                            onChange={(val) => {
                                setEndDate(val)
                            }}
                        />
                    </Box>

                    {formik.values.info
                        .map((info, index) => ({
                            ...info,
                            index,
                        }))
                        .filter((info) => info.type !== 'delete')
                        .map((info, index) => (
                            <Box key={`${info.id}_${info.index}`} display={'flex'} mt={2} alignItems={'flex-start'}>
                                {info.type === 'title' && (
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Подзаголовок"
                                        name={`info.${info.index}.text`}
                                        value={formik.values.info[info.index].text || ''}
                                        onChange={formik.handleChange}
                                    />
                                )}

                                {info.type === 'text' && (
                                    <TextAreaEdit
                                        value={data.info[info.index]?.text || ''}
                                        onChange={(value: string) => {
                                            formik.setFieldValue(`info.${info.index}.text`, value)
                                        }}
                                    />
                                )}

                                {info.type === 'video' && (
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        variant="outlined"
                                        label="Код видео"
                                        name={`info.${info.index}.text`}
                                        value={formik.values.info[info.index].text || ''}
                                        onChange={formik.handleChange}
                                    />
                                )}

                                {info.type === 'image' && (
                                    <Box flex="1 0 0%">
                                        {!info.image ? (
                                            <ImageUploadForm index={info.index} />
                                        ) : (
                                            <Box component={'img'} src={info.image.url} maxWidth="100%" />
                                        )}
                                    </Box>
                                )}

                                <Box display={'flex'} flexDirection={'column'} sx={{ ml: 2 }}>
                                    <IconButton disabled={index === 0} onClick={() => handleUpInfo(info.index)}>
                                        <KeyboardArrowUpIcon />
                                    </IconButton>

                                    <IconButton
                                        disabled={formik.values.info.length === info.index + 1}
                                        onClick={() => handleDownInfo(info.index)}
                                    >
                                        <KeyboardArrowDownIcon />
                                    </IconButton>
                                    {info.type === 'image' && <ImageUploadForm isEdit index={info.index} />}
                                    <IconButton color="error" onClick={() => handleRemoveInfo(info.index, info.id)}>
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
