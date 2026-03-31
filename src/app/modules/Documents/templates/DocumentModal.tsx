import {
    BarChart as BarChartIcon,
    ContentCopy as ContentCopyIcon,
    ContentCut as ContentCutIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    IosShare as IosShareIcon,
} from '@mui/icons-material'
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
import { LabelText } from 'app/components/LabelText'
import { Modal } from 'app/components/Modal'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { EState } from 'types'

import { documentsActions } from '../slice'
import { selectDocumentById, selectModal } from '../slice/selectors'

export const DocumentModal: React.FC = () => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const [openDelete, setOpenDelete] = useState<boolean>(false)

    const { isOpen, activeId } = useSelector(selectModal)
    const getDocument = useSelector(selectDocumentById)
    const document = getDocument(activeId)
    const checkStatickRole = useSelector(selectCheckAccess)

    const content = useMemo(() => {
        return (
            <>
                {document?.info.map((info) => (
                    <Box key={info.id}>
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
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Box mt={1.5} mb={0.5} component={'img'} src={info.image?.url} maxWidth="100%" />
                            </Box>
                        )}
                    </Box>
                ))}
            </>
        )
    }, [document])

    const handleClose = () => {
        dispatch(documentsActions.hideModal())
        if (document) {
            history(`/doc/${document.parentId}`)
        }
    }

    const handleEditDocument = () => {
        if (document) {
            dispatch(documentsActions.openEditModal(document))
        }
    }

    const handleCutDocument = () => {
        if (document) {
            dispatch(documentsActions.cutDocument(document.id))
        }
    }

    const handleCopyDocument = () => {
        if (document) {
            dispatch(documentsActions.copyDocument(document))
        }
    }

    const handleOpenDelete = () => {
        setOpenDelete(true)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleDeleteDocument = () => {
        if (document) {
            dispatch(documentsActions.deleteDocument(document.id))
            handleClose()
        }
        setOpenDelete(false)
    }

    const handleSetComplete = () => {
        if (document) {
            dispatch(
                documentsActions.setComplete({
                    did: document.id,
                    id: document.state.id,
                })
            )
        }
    }

    const handleShareDocument = async () => {
        try {
            await navigator.clipboard.writeText(location.href)
            toast.success('Ссылка успешно скопирована', {
                type: 'success',
            })
        } catch (e) {
            toast.success('Не получилось скопировать ссылку в буфер обмена', {
                type: 'error',
            })
        }
    }

    return (
        <>
            <Modal open={isOpen} title={document?.name || ''} handleClose={handleClose}>
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
                        {document?.end_date && document?.end_date !== 'Invalid date' && (
                            <Box mb={4}>
                                <LabelText label="Дата окончания акции" text={document.end_date} variant="body2" />
                            </Box>
                        )}

                        {content}
                    </Container>
                </Box>

                {checkStatickRole('update_document') ? (
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
                            border: '1px solid #F5F5F5',
                        }}
                    >
                        <Box display={'flex'} gap={1}>
                            <IconButton color="error" onClick={handleOpenDelete} sx={{ bgcolor: '#FDFDFD90' }}>
                                <DeleteIcon />
                            </IconButton>

                            <IconButton color="info" onClick={handleEditDocument} sx={{ bgcolor: '#FDFDFD90' }}>
                                <EditIcon />
                            </IconButton>

                            <IconButton color="secondary" onClick={handleCutDocument} sx={{ bgcolor: '#FDFDFD90' }}>
                                <ContentCutIcon />
                            </IconButton>

                            <IconButton color="primary" onClick={handleCopyDocument} sx={{ bgcolor: '#FDFDFD90' }}>
                                <ContentCopyIcon />
                            </IconButton>

                            <IconButton color="success" onClick={handleShareDocument} sx={{ bgcolor: '#FDFDFD90' }}>
                                <IosShareIcon />
                            </IconButton>

                            <LoadingButton
                                component={Link}
                                onClick={handleClose}
                                to={`/doc/${document?.id}/result`}
                                color="warning"
                                sx={{
                                    minWidth: 0,
                                    borderRadius: 8,
                                    bgcolor: '#FDFDFD90',
                                }}
                            >
                                <BarChartIcon />
                            </LoadingButton>
                        </Box>
                    </Box>
                ) : (
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
                            border: '1px solid #F5F5F5',
                        }}
                    >
                        <Box display={'flex'} gap={1}>
                            <IconButton color="success" onClick={handleShareDocument} sx={{ bgcolor: '#FDFDFD90' }}>
                                <IosShareIcon />
                            </IconButton>
                        </Box>
                    </Box>
                )}
                {document?.state.state !== EState.COMPLETED && (
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: '4px',
                            right: 0,
                            m: 1,
                            p: 1,
                            borderRadius: 8,
                            backdropFilter: 'blur(4px)',
                            bgcolor: '#FDFDFD30',
                            border: '1px solid #F5F5F5',
                        }}
                    >
                        <LoadingButton
                            color="success"
                            variant="outlined"
                            onClick={handleSetComplete}
                            sx={{ borderRadius: 8 }}
                        >
                            Прочитал
                        </LoadingButton>
                    </Box>
                )}
            </Modal>

            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                <DialogContent>
                    <DialogContentText>{`Вы уверены, что хотите удалить документ "${document?.name}"?`}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton onClick={handleDeleteDocument} autoFocus color="error">
                        Удалить
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
