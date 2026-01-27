import DeleteIcon from '@mui/icons-material/Delete'
import { LoadingButton } from '@mui/lab'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Typography,
} from '@mui/material'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { selectProfile, selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IComment } from 'types/IComment'
import { checkSudoAccess } from 'utils/roles'

import { commentsActions } from '../slice'
import { CommentForm } from './CommentForm'

interface Props {
    comment: IComment
}

export const Comment: React.FC<Props> = ({ comment }) => {
    const dispatch = useDispatch()

    const [openDelete, setOpenDelete] = useState(false)
    const [edit, setEdit] = useState(false)
    const profile = useSelector(selectProfile)
    const profileRole = useSelector(selectProfileRole)

    const handleClick = () => {
        setEdit(true)
    }

    const handleCloseEdit = () => {
        setEdit(false)
    }

    const handleOpenDeleted = () => {
        setOpenDelete(true)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }

    const handleDeleted = () => {
        dispatch(commentsActions.deleteComment(comment.id))
    }

    return (
        <Box
            key={comment.id}
            sx={{
                border: '1px solid #f0f0f0',
                borderRadius: 2,
                width: '100%',
            }}
        >
            {edit ? (
                <CommentForm oid={comment.oid} type={comment.type} comment={comment} handleSubmit={handleCloseEdit} />
            ) : (
                <Box
                    sx={{
                        p: 1,
                        display: 'flex',
                        gap: 1,
                    }}
                >
                    <AvatarImage
                        name={`${comment.author?.last_name} ${comment.author?.name}`}
                        image={comment.author?.avatar?.thumb}
                        size={35}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0,
                            width: '100%',
                        }}
                    >
                        <Typography
                            variant="caption"
                            fontWeight={600}
                        >{`${comment.author?.last_name} ${comment.author?.name}`}</Typography>

                        <Typography variant="body2">{comment.text}</Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: 1,
                                alignItems: 'center',
                            }}
                        >
                            {profile.id === comment.uid && (
                                <Typography
                                    variant="caption"
                                    fontWeight={600}
                                    sx={{
                                        cursor: 'pointer',
                                        mr: 1,
                                    }}
                                    onClick={handleClick}
                                >
                                    Редактировать
                                </Typography>
                            )}
                            <Typography variant="caption">
                                {comment.created_at === comment.updated_at ? 'Написано:' : 'Изменено:'}
                            </Typography>
                            <Typography variant="caption">{comment.updatedAt}</Typography>

                            {profile.id === comment.uid || checkSudoAccess(profileRole)}
                            <IconButton aria-label="delete" size="small" onClick={handleOpenDeleted}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            )}
            <Dialog open={openDelete} onClose={handleCloseDelete}>
                <DialogTitle id="alert-dialog-title">Внимание!</DialogTitle>

                <DialogContent>
                    <DialogContentText>{`Вы уверены, что хотите безвозвратно удалить комментарий?`}</DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Отмена
                    </Button>

                    <LoadingButton onClick={handleDeleted} autoFocus color="error">
                        Удалить
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
