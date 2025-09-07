import { StarBorder as StarBorderIcon, StarRate as StarRateIcon } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Container, IconButton, Modal as ModalComponent, Tab, Typography } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { logActions } from 'app/modules/Log/slice'
import { LogList } from 'app/modules/Log/templates/LogList'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import { ResultUserList } from 'app/modules/Results/templates/ResultUserList'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAdminAccess } from 'utils/roles'

import { UserModalContent } from '../components/UserModalContent'
import { usersActions } from '../slice'
import { selectModal, selectUserById } from '../slice/selectors'

export const UserModal: React.FC = () => {
    const dispatch = useDispatch()

    const [openPhoto, setOpenPhoto] = useState<boolean>(false)
    const [value, setValue] = useState<string>('user')

    const profileRole = useSelector(selectProfileRole)
    const { isOpen, activeId } = useSelector(selectModal)
    const getUser = useSelector(selectUserById)
    const user = getUser(activeId)

    const handleClose = () => {
        dispatch(usersActions.hideModal())
    }

    const handleOpenAvatar = () => {
        setOpenPhoto(true)
    }

    const handleAddFavorite = () => {
        if (user) {
            dispatch(usersActions.addFavorite(user.id))
        }
    }

    const handleDeleteFavorite = () => {
        if (user) {
            dispatch(usersActions.deleteFavorite(user.id))
        }
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    useEffect(() => {
        if (user && checkAdminAccess(profileRole)) {
            dispatch(logActions.loadLog(user?.id))
        }
    }, [user?.id])

    return (
        <>
            <Modal
                pl={1}
                open={isOpen}
                title={
                    <Box display={'flex'} alignItems={'center'}>
                        <AvatarImage
                            name={`${user?.last_name} ${user?.name}`}
                            image={user?.avatar?.thumb}
                            size={42}
                            onClick={handleOpenAvatar}
                            achieve={user?.achieve}
                        />

                        <Typography variant="h5" sx={{ mx: 1 }}>
                            {`${user?.last_name} ${user?.name}`}
                        </Typography>

                        {checkAdminAccess(profileRole) && (
                            <>
                                {!!user?.favorite && (
                                    <IconButton onClick={handleDeleteFavorite}>
                                        <StarRateIcon color="warning" />
                                    </IconButton>
                                )}

                                {!user?.favorite && (
                                    <IconButton onClick={handleAddFavorite}>
                                        <StarBorderIcon />
                                    </IconButton>
                                )}
                            </>
                        )}

                        {!checkAdminAccess(profileRole) && (
                            <>
                                {!!user?.favorite && <StarRateIcon color="warning" />}

                                {!user?.favorite && <StarBorderIcon />}
                            </>
                        )}
                    </Box>
                }
                handleClose={handleClose}
            >
                <Box
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
                        <TabContext value={value}>
                            {checkAdminAccess(profileRole) && (
                                <TabList onChange={handleChange}>
                                    <Tab label="Профиль" value="user" sx={{ px: 3 }} />
                                    <Tab label="Тестирование" value="test" sx={{ px: 3 }} />
                                    <Tab label="Изменения" value="history" sx={{ px: 3 }} />
                                </TabList>
                            )}
                            <TabPanel value="user" sx={{ p: 0 }}>
                                {user && (
                                    <UserModalContent handleClose={handleClose} profileRole={profileRole} user={user} />
                                )}
                            </TabPanel>
                            <TabPanel value="test" sx={{ p: 0 }}>
                                {user && <ResultUserList user={user} />}
                            </TabPanel>
                            <TabPanel value="history" sx={{ p: 0 }}>
                                <LogList />
                            </TabPanel>
                        </TabContext>
                    </Container>
                </Box>
            </Modal>

            <ModalComponent
                open={openPhoto}
                onClose={() => setOpenPhoto(false)}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box component={'img'} src={user?.avatar?.url} sx={{ maxWidth: '90%', maxHeight: '90%' }} />
            </ModalComponent>
        </>
    )
}
