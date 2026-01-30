import {
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
} from '@mui/material'
import { Modal } from 'app/components/Modal'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import React, { useState } from 'react'
import { DocumentViewer } from 'react-documents'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { excelActions } from '../slice'
import { selectExcelById, selectModal } from '../slice/selectors'
import { ExcelEdit } from './ExcelEdit'

export const ExcelModal: React.FC = () => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const [openDelete, setOpenDelete] = useState<boolean>(false)

    const { isOpen, activeId } = useSelector(selectModal)
    const getExcel = useSelector(selectExcelById)
    const excel = getExcel(activeId)
    const checkStatickRole = useSelector(selectCheckAccess)

    const handleClose = () => {
        dispatch(excelActions.hideModal())
        if (excel) {
            history(`/doc/${excel.parent_id}`)
        }
    }

    const handleEditExcel = () => {
        if (excel) {
            dispatch(excelActions.openEditModal(excel))
        }
    }

    const handleCutExcel = () => {
        if (excel) {
            dispatch(excelActions.cutExcel(excel.id))
        }
    }

    const handleCopyExcel = () => {
        if (excel) {
            dispatch(excelActions.copyExcel(excel))
        }
    }

    const handleOpenDelete = () => {
        setOpenDelete(true)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleDeleteExcel = () => {
        if (excel) {
            dispatch(excelActions.deleteExcel(excel.id))
            handleClose()
        }
        setOpenDelete(false)
    }

    const handleShareExcel = async () => {
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
            <Modal open={isOpen} title={excel?.name || ''} handleClose={handleClose}>
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
                    <Container sx={{ flexGrow: 1 }}>
                        {excel && (
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            <DocumentViewer
                                queryParams="hl=Nl"
                                url={excel.url}
                                viewer={excel.type === 'pdf' ? 'pdf' : 'office'}
                            ></DocumentViewer>
                        )}
                    </Container>
                </Box>

                {checkStatickRole('update_excel') ? (
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

                            <IconButton color="info" onClick={handleEditExcel} sx={{ bgcolor: '#FDFDFD90' }}>
                                <EditIcon />
                            </IconButton>

                            <IconButton color="secondary" onClick={handleCutExcel} sx={{ bgcolor: '#FDFDFD90' }}>
                                <ContentCutIcon />
                            </IconButton>

                            <IconButton color="primary" onClick={handleCopyExcel} sx={{ bgcolor: '#FDFDFD90' }}>
                                <ContentCopyIcon />
                            </IconButton>

                            <IconButton color="success" onClick={handleShareExcel} sx={{ bgcolor: '#FDFDFD90' }}>
                                <IosShareIcon />
                            </IconButton>
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
                            <IconButton color="success" onClick={handleShareExcel} sx={{ bgcolor: '#FDFDFD90' }}>
                                <IosShareIcon />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </Modal>

            <ExcelEdit id={activeId} />

            <Dialog open={openDelete} onClose={handleCloseDelete} aria-labelledby="alert-dialog-title">
                <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                <DialogContent>
                    <DialogContentText>{`Вы уверены, что хотите удалить документ "${excel?.name}"?`}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton onClick={handleDeleteExcel} autoFocus color="error">
                        Удалить
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}
