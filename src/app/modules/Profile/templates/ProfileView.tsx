import { Edit as EditIcon, Logout as LogoutIcon } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { LoginButton, TelegramAuthData } from '@telegram-auth/react'
import { authActions } from 'app/modules/Auth/slice'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectSettings } from 'app/modules/Settings/slice/selectors'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AccountData } from '../components/AccountData'
import { AccountDataForm } from '../components/AccountDataForm'
import { AvatarForm } from '../components/AvatarForm'
import { DeleteModal } from '../components/DeleteModal'
import { profileActions } from '../slice'
import { selectProfile } from '../slice/selectors'

export const ProfileView: React.FC = () => {
    const dispatch = useDispatch()

    const [open, setOpen] = useState<boolean>(false)
    const [hasAccountDataEdit, setHasAccountDataEdit] = useState<boolean>(false)

    const profile = useSelector(selectProfile)
    const settings = useSelector(selectSettings)

    const handleClickAccountDataEdit = () => {
        setHasAccountDataEdit(true)
    }

    const handleFinishAccountDataEdit = () => {
        setHasAccountDataEdit(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleTelegram = (data: TelegramAuthData) => {
        dispatch(profileActions.telegramProfile(data))
    }

    const logout = () => {
        setOpen(false)
        dispatch(authActions.logout())
    }

    return (
        <Main
            title={'Профиль'}
            searchDisabled
            endNode={
                <Button variant="text" startIcon={<LogoutIcon />} onClick={() => setOpen(true)}>
                    {'Выйти'}
                </Button>
            }
        >
            <Box pb={11}>
                <Box px={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <AvatarForm />

                    {!hasAccountDataEdit && (
                        <Button variant="outlined" startIcon={<EditIcon />} onClick={handleClickAccountDataEdit}>
                            Редактировать
                        </Button>
                    )}
                    {hasAccountDataEdit && settings.telegram && !profile.telegram_id && (
                        <LoginButton
                            botUsername={settings.telegram}
                            buttonSize="large" // "large" | "medium" | "small"
                            cornerRadius={20} // 0 - 20
                            showAvatar={true} // true | false
                            lang="ru"
                            onAuthCallback={handleTelegram}
                        />
                    )}
                </Box>

                <Box sx={{ mt: 5, px: 1 }}>
                    {!hasAccountDataEdit && <AccountData />}

                    {hasAccountDataEdit && <AccountDataForm onEditFinish={handleFinishAccountDataEdit} />}
                </Box>

                <DeleteModal />

                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                    <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                    <DialogContent>
                        <DialogContentText>Вы уверены, что хотите выйти?</DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={logout} color="error">
                            Выйти
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Main>
    )
}
