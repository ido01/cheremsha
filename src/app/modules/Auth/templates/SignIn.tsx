import { LoadingButton } from '@mui/lab'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { LoginButton, TelegramAuthData } from '@telegram-auth/react'
import { Logo } from 'app/components/Logo/Logo'
import { selectSettings } from 'app/modules/Settings/slice/selectors'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { EStatus } from 'types'
import * as yup from 'yup'

import { authActions } from '../slice'
import { selectSigninForm } from '../slice/selectors'
import { Auth } from './Auth'

export const SignIn: React.FC = () => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const [showTelegram, setTelegram] = useState(false)
    const settings = useSelector(selectSettings)
    const { status, data } = useSelector(selectSigninForm)

    const handleTelegram = (data: TelegramAuthData) => {
        dispatch(authActions.telegramAuth(data))
    }

    const handleShowTelegram = () => {
        setTelegram(true)
    }

    const validationSchema = yup.object({
        email: yup.string().required().email(),
        password: yup.string().required(),
    })

    const formik = useFormik({
        validationSchema,
        initialValues: data,
        validateOnBlur: false,
        validateOnChange: false,
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(authActions.signIn(values))
        },
    })

    return (
        <Auth>
            <Box
                sx={{
                    bgcolor: 'grey.200',
                    display: 'flex',
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Paper
                    sx={{
                        bgcolor: 'white',
                        p: 8.75,
                        width: '480px',
                    }}
                >
                    <Box
                        noValidate
                        component="form"
                        onSubmit={(e: React.FormEvent) => {
                            e.preventDefault()

                            formik.handleSubmit()
                        }}
                    >
                        <Box mb={2} display={'flex'} justifyContent={'center'}>
                            <Logo size={'big'} />
                        </Box>

                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email"
                            name="email"
                            value={formik.values.email || ''}
                            error={!!formik.errors.email}
                            onChange={formik.handleChange}
                        />

                        <TextField
                            fullWidth
                            sx={{ mt: 3 }}
                            variant="outlined"
                            label="Пароль"
                            name="password"
                            type={'password'}
                            value={formik.values.password || ''}
                            error={!!formik.errors.password}
                            onChange={formik.handleChange}
                        />

                        <LoadingButton
                            loading={status === EStatus.PENDING}
                            fullWidth
                            size="large"
                            color="primary"
                            variant="contained"
                            sx={{ mt: 3 }}
                            onClick={() => formik.handleSubmit()}
                        >
                            Войти
                        </LoadingButton>

                        <Box my={1} display={'flex'} justifyContent={'space-between'}>
                            <Button
                                variant="text"
                                onClick={() => history('/auth/recovery')}
                                sx={{ textTransform: 'initial' }}
                            >
                                Забыл пароль?
                            </Button>

                            <Button
                                variant="text"
                                onClick={() => history('/auth/signup')}
                                sx={{ textTransform: 'initial' }}
                            >
                                Регистрация
                            </Button>
                        </Box>

                        {!!settings.telegram && (
                            <>
                                <Typography variant="caption">Если привязали аккаунт Telegram</Typography>
                                {showTelegram ? (
                                    <LoginButton
                                        botUsername={settings.telegram}
                                        buttonSize="large" // "large" | "medium" | "small"
                                        cornerRadius={20} // 0 - 20
                                        showAvatar={true} // true | false
                                        lang="ru"
                                        onAuthCallback={handleTelegram}
                                    />
                                ) : (
                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        color="info"
                                        variant="contained"
                                        onClick={handleShowTelegram}
                                    >
                                        Войти через Telegram
                                    </LoadingButton>
                                )}
                            </>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Auth>
    )
}
