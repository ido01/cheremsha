import {
    Delete as DeleteIcon,
    MailOutline as MailOutlineIcon,
    MarkEmailRead as MarkEmailReadIcon,
} from '@mui/icons-material'
import { Box, CircularProgress, IconButton, Typography } from '@mui/material'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IMatrixUser } from 'types/IMatrix'

import { matrixActions } from '../slice'
import { selectStatus } from '../slice/selectors'

interface Props {
    block: IMatrixUser
    isDelete?: boolean
    isSend?: boolean
}

export const User: React.FC<Props> = ({ block, isDelete, isSend }) => {
    const dispatch = useDispatch()

    const { send } = useSelector(selectStatus)
    const [isLoading, setLoading] = useState(false)
    const handleClick = () => {
        if (!isLoading) {
            setLoading(true)
            if (isDelete) {
                dispatch(matrixActions.userDelete(block.id))
            } else if (isSend) {
                dispatch(matrixActions.send(block.id))
            }
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                p: 1,
                justifyContent: 'space-between',
                border: '1px solid #ECEFF1',
                borderRadius: '48px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                }}
            >
                <AvatarImage
                    size={32}
                    image={block.user?.avatar?.thumb}
                    name={`${block.user?.last_name} ${block.user?.name}`}
                />

                <Typography variant="body2">{`${block.user?.last_name} ${block.user?.name}`}</Typography>
            </Box>

            {isDelete && (
                <IconButton color="error" aria-haspopup="true" onClick={handleClick}>
                    {isLoading ? <CircularProgress size={24} /> : <DeleteIcon />}
                </IconButton>
            )}

            {isSend && (
                <IconButton color="success" aria-haspopup="true" onClick={handleClick}>
                    {isLoading && send === EStatus.PENDING ? (
                        <CircularProgress size={24} />
                    ) : isLoading && send === EStatus.FINISHED ? (
                        <MarkEmailReadIcon />
                    ) : (
                        <MailOutlineIcon />
                    )}
                </IconButton>
            )}
        </Box>
    )
}
