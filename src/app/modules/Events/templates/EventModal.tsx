import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Typography,
} from '@mui/material'
import { Modal } from 'app/components/Modal'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAdminAccess } from 'utils/roles'

import { eventsActions } from '../slice/events'
import { selectEventById, selectModal } from '../slice/events/selectors'

export const EventModal: React.FC = () => {
    const dispatch = useDispatch()

    const [openDelete, setOpenDelete] = useState<boolean>(false)

    const profileRole = useSelector(selectProfileRole)
    const { isOpen, activeId } = useSelector(selectModal)
    const getEvent = useSelector(selectEventById)
    const event = getEvent(activeId)

    const handleClose = () => {
        dispatch(eventsActions.hideModal())
    }

    const handleEditDocument = () => {
        if (event) {
            dispatch(eventsActions.openEditModal(event))
        }
    }

    const handleOpenDelete = () => {
        setOpenDelete(true)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleDeleteEvent = () => {
        if (event) {
            dispatch(eventsActions.deleteEvent(event.id))
            handleClose()
        }
        setOpenDelete(false)
    }

    return (
        <>
            <Modal open={isOpen} title={event?.name || ''} handleClose={handleClose}>
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
                        {event?.info.map((info, index) => (
                            <Box key={index}>
                                {info.type === 'title' && (
                                    <Typography sx={{ mt: 3, mb: 1 }} variant="h5" fontWeight={500}>
                                        {info.text}
                                    </Typography>
                                )}

                                {(info.type === 'text' || info.type === 'video') && (
                                    <Typography sx={{ mt: 1 }} variant="body1">
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: info.text,
                                            }}
                                        />
                                    </Typography>
                                )}

                                {info.type === 'image' && (
                                    <Box mt={1.5} mb={0.5} component={'img'} src={info.image?.url} maxWidth="100%" />
                                )}
                            </Box>
                        ))}
                    </Container>
                </Box>

                {checkAdminAccess(profileRole) && (
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '4px',
                            left: 0,
                            m: 1,
                            p: 1,
                            borderRadius: 8,
                            backdropFilter: 'blur(4px)',
                            bgcolor: '#FDFDFD30',
                            boxShadow: '0px 4px 4px #3332',
                        }}
                    >
                        <Box display={'flex'} gap={1}>
                            <IconButton color="error" onClick={handleOpenDelete} sx={{ bgcolor: '#FDFDFD90' }}>
                                <DeleteIcon />
                            </IconButton>

                            <IconButton color="info" onClick={handleEditDocument} sx={{ bgcolor: '#FDFDFD90' }}>
                                <EditIcon />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </Modal>

            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                <DialogContent>
                    <DialogContentText>{`Вы уверены, что хотите удалить событие "${event?.name}"?`}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton onClick={handleDeleteEvent} autoFocus color="error">
                        Удалить
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
