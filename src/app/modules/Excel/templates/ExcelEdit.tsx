import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Modal } from 'app/components/Modal'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { DocumentViewer } from 'react-documents'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { EStatus } from 'types'
import * as yup from 'yup'

import { excelActions } from '../slice'
import { selectForm } from '../slice/selectors'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})

interface Props {
    id: string
}

export const ExcelEdit: React.FC<Props> = ({ id }) => {
    const dispatch = useDispatch()

    const { open, status, data } = useSelector(selectForm)
    const [version, setVersion] = useState(data.id)
    const [preview, setPreview] = useState(data)

    const versions = useMemo(() => {
        setVersion(data.id)
        return [data, ...(data.versions || [])]
    }, [data])

    useEffect(() => {
        const v = data.versions?.find((ver) => ver.id === version)
        if (v) {
            setPreview(v)
        } else {
            setPreview(data)
        }
    }, [version, data])

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
                    excelActions.modifyExcel({
                        id: values.id,
                        versionId: version,
                        name: values.name,
                    })
                )
            }
        },
    })

    const handleClose = () => {
        dispatch(excelActions.hideEditModal())
    }

    const handleChange = ({ target }: any) => {
        let isError = false
        const files: File[] = []

        Array.from(target.files as File[]).forEach((file: File) => {
            const map = file.name.split('.')
            const exp = map[map.length - 1]
            if (
                exp !== 'doc' &&
                exp !== 'docx' &&
                exp !== 'pdf' &&
                exp !== 'pptx' &&
                exp !== 'ppt' &&
                exp !== 'xls' &&
                exp !== 'xlsx'
            ) {
                isError = true
            } else {
                files.push(file)
            }
        })
        if (isError) {
            toast.error('Разрешенный тип файла doc / docx / pdf / pptx / ppt / xls / xlsx', {
                type: 'error',
            })
            return
        }
        dispatch(
            excelActions.updateExcel({
                id,
                parent_id: data.parent_id,
                files,
            })
        )
    }

    useEffect(() => {
        if (id && open) {
            dispatch(excelActions.viewExcel(id))
        }
    }, [id, open])

    return (
        <Modal open={open} title={`Редактировать ${data.type}`} handleClose={handleClose}>
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
                            py: 1,
                            gap: 2,
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Название"
                            name="name"
                            value={formik.values.name || ''}
                            error={!!formik.errors.name}
                            onChange={formik.handleChange}
                        />

                        <Box
                            sx={{
                                display: 'grid',
                                gap: 2,
                                gridTemplateColumns: '2fr 1fr',
                            }}
                        >
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Версия документа</InputLabel>

                                <Select
                                    value={version || ''}
                                    label="Версия документа"
                                    onChange={(e) => {
                                        const { value } = e.target

                                        setVersion(value)
                                    }}
                                >
                                    {versions.map((v, index) => {
                                        return (
                                            <MenuItem key={index} value={v.id}>
                                                {`Версия ${v.version} от ${dayjs(v.createdAt)
                                                    .locale('ru')
                                                    .format('D MMM YYYY')}`}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>

                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Загрузить новую версию документа
                                <VisuallyHiddenInput type="file" onChange={handleChange} />
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                height: '256px',
                            }}
                        >
                            <Typography variant="caption">Предпросмотр</Typography>
                            {open && preview && (
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                //@ts-ignore
                                <DocumentViewer
                                    queryParams="hl=Nl"
                                    url={preview.url}
                                    viewer={preview.type === 'pdf' ? 'pdf' : 'office'}
                                ></DocumentViewer>
                            )}
                        </Box>
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
