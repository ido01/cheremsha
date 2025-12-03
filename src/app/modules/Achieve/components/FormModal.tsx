import * as Icons from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Container, TextField, Typography } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import * as yup from 'yup'

import { achieveActions } from '../slice'
import { selectForm } from '../slice/selectors'
import { AvatarForm } from './AvatarForm'

const IconsNames = [
    'AcUnit',
    'AccessTimeFilled',
    'BarChart',
    'BeachAccess',
    'Cake',
    'CatchingPokemon',
    'Celebration',
    'CheckCircle',
    'Cookie',
    'Recommend',
    'Support',
    'Verified',
    'Whatshot',
    'WorkspacePremium',
    'AccessibleForward',
    'AirlineSeatIndividualSuite',
    'AssistWalker',
    'Audiotrack',
    'AutoAwesome',
    'BakeryDining',
    'AutoGraph',
    'Casino',
    'CleanHands',
    'Deck',
    'ImagesearchRoller',
    'RocketLaunch',
    'Sick',
]

const Colors = ['#4CAF50', '#00B0FF', '#FFA000', '#7E57C2', '#00BCD4', '#D32F2F', '#212121', '#795548']

export const FormModal: React.FC = () => {
    const dispatch = useDispatch()

    const { data, status, open } = useSelector(selectForm)

    const validationSchema = yup.object({
        label: yup.string().required(),
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
                    achieveActions.updateAchieve({
                        ...values,
                    })
                )
            } else {
                dispatch(
                    achieveActions.createAchieve({
                        ...values,
                    })
                )
            }
        },
    })

    const handleClose = () => {
        dispatch(achieveActions.hideEditModal())
    }

    return (
        <Modal open={open} title={data.id ? 'Редактирование Ачивки' : 'Создание Ачивки'} handleClose={handleClose}>
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
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    flexShrink: 0,
                                }}
                            >
                                <AvatarForm achieve={formik.values} />
                            </Box>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Название"
                                name="label"
                                value={formik.values.label || ''}
                                error={!!formik.errors.label}
                                onChange={formik.handleChange}
                            />
                        </Box>

                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            variant="outlined"
                            label="Описание"
                            name="description"
                            value={formik.values.description || ''}
                            error={!!formik.errors.description && formik.touched.description}
                            onChange={formik.handleChange}
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                flexDirection: 'column',
                            }}
                        >
                            <Typography variant="caption">Иконка</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 0.5,
                                }}
                            >
                                {IconsNames.map((icon, index) => {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    const Icon = Icons[icon]
                                    const active = icon === formik.values.icon
                                    return (
                                        <Box
                                            key={index}
                                            sx={{
                                                cursor: 'pointer',
                                                display: 'flex',
                                                p: 1,
                                                borderRadius: 8,
                                                backgroundColor: active ? formik.values.color : 'transparent',
                                                color: active ? '#fff' : '#333',
                                                ':hover': {
                                                    backgroundColor: formik.values.color,
                                                    color: '#fff',
                                                },
                                            }}
                                            onClick={() => {
                                                formik.setFieldValue('icon', icon)
                                            }}
                                        >
                                            <Icon />
                                        </Box>
                                    )
                                })}
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                flexDirection: 'column',
                            }}
                        >
                            <Typography variant="caption">Цвет</Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 0.5,
                                }}
                            >
                                {Colors.map((color, index) => {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    const Icon = Icons[formik.values.icon]
                                    const active = color === formik.values.color
                                    return (
                                        <Box
                                            key={index}
                                            sx={{
                                                cursor: 'pointer',
                                                display: 'flex',
                                                p: 1,
                                                borderRadius: 8,
                                                backgroundColor: color,
                                                color: active ? '#fff' : '#333',
                                            }}
                                            onClick={() => {
                                                formik.setFieldValue('color', color)
                                            }}
                                        >
                                            {Icon && <Icon />}
                                        </Box>
                                    )
                                })}
                            </Box>
                        </Box>

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Значимость"
                            name="order_row"
                            value={formik.values.order_row || ''}
                            error={!!formik.errors.order_row}
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
