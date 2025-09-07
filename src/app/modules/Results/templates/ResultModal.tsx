import { StarBorder as StarBorderIcon, StarRate as StarRateIcon } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Container, Modal as ModalComponent, Tab, Typography } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import { UserModalContent } from 'app/modules/Users/components/UserModalContent'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { checkAdminAccess } from 'utils/roles'

import { ResultModalContent } from '../components/ResultModalContent'
import { resultsActions } from '../slice'
import { selectModal, selectResultById } from '../slice/selectors'

export const ResultModal: React.FC = () => {
    const dispatch = useDispatch()

    const { id } = useParams<{ id: string }>()

    const [value, setValue] = useState<string>('test')
    const [openPhoto, setOpenPhoto] = useState<boolean>(false)

    const profileRole = useSelector(selectProfileRole)
    const { isOpen, activeId } = useSelector(selectModal)
    const getResult = useSelector(selectResultById)
    const user = getResult(activeId)

    const handleClose = () => {
        dispatch(resultsActions.hideModal())
    }

    const handleOpenAvatar = () => {
        setOpenPhoto(true)
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    useEffect(() => {
        if (activeId) {
            dispatch(resultsActions.loadResult({ id, uid: activeId }))
        }
    }, [activeId])

    return (
        <>
            <Modal
                open={isOpen}
                title={
                    <Box display={'flex'} alignItems={'center'}>
                        <AvatarImage
                            name={`${user?.last_name} ${user?.name}`}
                            image={user?.avatar?.thumb}
                            size={42}
                            achieve={user?.achieve}
                            onClick={handleOpenAvatar}
                        />

                        <Typography variant="h5" sx={{ mx: 1 }}>
                            {`${user?.last_name} ${user?.name}`}
                        </Typography>

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
                            <TabList onChange={handleChange}>
                                <Tab label="Результаты теста" value="test" sx={{ px: 3 }} />
                                <Tab label="Профиль" value="user" sx={{ px: 3 }} />
                            </TabList>

                            <TabPanel value="user" sx={{ p: 0 }}>
                                {user && <UserModalContent profileRole={profileRole} user={user} />}
                            </TabPanel>
                            <TabPanel value="test" sx={{ p: 0 }}>
                                {user && <ResultModalContent id={id} user={user} />}
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
