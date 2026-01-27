import CreateIcon from '@mui/icons-material/Create'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { commentsActions } from 'app/modules/Comments/slice'
import { commentInit } from 'app/modules/Comments/slice/constants'
import { selectProfile } from 'app/modules/Profile/slice/selectors'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IIssue } from 'types/IIssue'

import { issuesActions } from '../slice'
import { issueInit } from '../slice/constants'
import { selectSteps } from '../slice/selectors'
import { issueRoleCheck } from '../slice/utils'

interface Props {
    issue: IIssue
}

export const ControlBlock: React.FC<Props> = ({ issue }) => {
    const dispatch = useDispatch()

    const [openDelete, setOpenDelete] = useState(false)
    const steps = useSelector(selectSteps)
    const profile = useSelector(selectProfile)
    const checkStatickRole = useSelector(selectCheckAccess)

    const handleEdit = () => {
        dispatch(issuesActions.openEditModal(issue))
    }

    const handleExecutor = () => {
        dispatch(issuesActions.showFindModal(issue))
    }

    const handleAdd = () => {
        dispatch(
            issuesActions.openEditModal({
                ...issueInit,
                parent_id: issue.id || '0',
                type: 'task',
                access_update: issue.access_update,
                access_view: issue.access_view,
                grade_name: issue.grade_name,
            })
        )
    }

    const handleProgress = () => {
        dispatch(
            issuesActions.statusIssue({
                id: issue.id,
                status: 'progress',
            })
        )
    }

    const handleOpen = () => {
        dispatch(
            issuesActions.statusIssue({
                id: issue.id,
                status: 'open',
            })
        )
    }

    const handleDone = () => {
        dispatch(
            issuesActions.statusIssue({
                id: issue.id,
                status: 'done',
            })
        )
    }

    const handleError = () => {
        dispatch(
            issuesActions.statusIssue({
                id: issue.id,
                status: 'error',
            })
        )
    }

    const handleReview = () => {
        dispatch(
            issuesActions.statusIssue({
                id: issue.id,
                status: 'review',
            })
        )
    }

    const handleClosed = () => {
        dispatch(
            issuesActions.statusIssue({
                id: issue.id,
                status: 'closed',
            })
        )
    }

    const handleOpenDeleted = () => {
        setOpenDelete(true)
    }

    const handleDeleted = () => {
        dispatch(
            issuesActions.statusIssue({
                id: issue.id,
                status: 'deleted',
            })
        )
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleAddComment = () => {
        dispatch(
            commentsActions.openEditModal({
                ...commentInit,
                oid: issue.id,
                type: issue.type,
            })
        )
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 1,
                flexDirection: { xs: 'column', xl: 'row' },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: 4,
                    flexDirection: { xs: 'column', lg: 'row' },
                }}
            >
                {issueRoleCheck(profile, issue.access_update, issue) && (
                    <Button
                        variant="contained"
                        color="grey"
                        size="small"
                        startIcon={<CreateIcon />}
                        onClick={handleEdit}
                    >
                        Редактировать
                    </Button>
                )}

                <Box sx={{ display: 'flex', gap: 1 }}>
                    {issueRoleCheck(profile, issue.access_update, issue) && (
                        <Button variant="contained" size="small" color="grey" onClick={handleAdd}>
                            Добавить подзадачу
                        </Button>
                    )}
                    {issueRoleCheck(profile, issue.access_view, issue) && (
                        <Button variant="contained" size="small" color="grey" onClick={handleAddComment}>
                            Добавить комментарий
                        </Button>
                    )}
                    {!issue.executor && issueRoleCheck(profile, issue.access_update, issue) && (
                        <Button variant="contained" size="small" color="grey" onClick={handleExecutor}>
                            Назначить исполнителя
                        </Button>
                    )}
                </Box>
            </Box>

            {issueRoleCheck(profile, issue.access_update, issue) && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {issue.status === 'open' && (
                            <>
                                <LoadingButton
                                    loading={steps.loading && steps.id === issue.id && steps.status === 'progress'}
                                    variant="contained"
                                    color="grey"
                                    onClick={handleProgress}
                                >
                                    Взять в работу
                                </LoadingButton>
                                <LoadingButton
                                    loading={steps.loading && steps.id === issue.id && steps.status === 'closed'}
                                    variant="contained"
                                    color="grey"
                                    onClick={handleClosed}
                                >
                                    Отменить
                                </LoadingButton>
                            </>
                        )}
                        {issue.status === 'progress' && (
                            <>
                                <LoadingButton
                                    loading={steps.loading && steps.id === issue.id && steps.status === 'review'}
                                    variant="contained"
                                    color="grey"
                                    onClick={handleReview}
                                >
                                    На проверку
                                </LoadingButton>
                                <LoadingButton
                                    loading={steps.loading && steps.id === issue.id && steps.status === 'error'}
                                    variant="contained"
                                    color="grey"
                                    onClick={handleError}
                                >
                                    Сообщить о проблеме
                                </LoadingButton>
                                <LoadingButton
                                    loading={steps.loading && steps.id === issue.id && steps.status === 'closed'}
                                    variant="contained"
                                    color="grey"
                                    onClick={handleClosed}
                                >
                                    Отменить
                                </LoadingButton>
                            </>
                        )}
                        {issue.status === 'review' && (
                            <>
                                <LoadingButton
                                    loading={steps.loading && steps.id === issue.id && steps.status === 'done'}
                                    variant="contained"
                                    color="grey"
                                    onClick={handleDone}
                                >
                                    Выполнена
                                </LoadingButton>
                                <LoadingButton
                                    loading={steps.loading && steps.id === issue.id && steps.status === 'error'}
                                    variant="contained"
                                    color="grey"
                                    onClick={handleError}
                                >
                                    Сообщить о проблеме
                                </LoadingButton>
                                <LoadingButton
                                    loading={steps.loading && steps.id === issue.id && steps.status === 'open'}
                                    variant="contained"
                                    color="grey"
                                    onClick={handleOpen}
                                >
                                    Переоткрыть
                                </LoadingButton>
                            </>
                        )}
                        {issue.status === 'done' && (
                            <>
                                <LoadingButton
                                    loading={steps.loading && steps.id === issue.id && steps.status === 'open'}
                                    variant="contained"
                                    color="grey"
                                    onClick={handleOpen}
                                >
                                    Переоткрыть
                                </LoadingButton>
                            </>
                        )}
                        {issue.status === 'error' && (
                            <>
                                <LoadingButton
                                    loading={steps.loading && steps.id === issue.id && steps.status === 'open'}
                                    variant="contained"
                                    color="grey"
                                    onClick={handleOpen}
                                >
                                    Переоткрыть
                                </LoadingButton>
                                <LoadingButton
                                    loading={steps.loading && steps.id === issue.id && steps.status === 'progress'}
                                    variant="contained"
                                    color="grey"
                                    onClick={handleProgress}
                                >
                                    Взять в работу
                                </LoadingButton>
                                <LoadingButton
                                    loading={steps.loading && steps.id === issue.id && steps.status === 'closed'}
                                    variant="contained"
                                    color="grey"
                                    onClick={handleClosed}
                                >
                                    Отменить
                                </LoadingButton>
                            </>
                        )}
                    </Box>

                    {checkStatickRole('sudo') && (
                        <LoadingButton
                            loading={steps.loading && steps.id === issue.id && steps.status === 'deleted'}
                            variant="contained"
                            color="error"
                            onClick={handleOpenDeleted}
                            startIcon={<DeleteForeverIcon />}
                        >
                            Удалить
                        </LoadingButton>
                    )}
                </Box>
            )}

            <Dialog open={openDelete} onClose={handleCloseDelete}>
                <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                <DialogContent>
                    <DialogContentText>{`Вы уверены, что хотите безвозвратно удалить задачу "${issue.title}"?`}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton
                        loading={steps.loading && steps.id === issue.id && steps.status === 'deleted'}
                        onClick={handleDeleted}
                        autoFocus
                        color="error"
                    >
                        Удалить
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
