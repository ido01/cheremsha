import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { commentsActions } from '../slice'
import { CommentForm } from './CommentForm'
import { CommentList } from './CommentList'

interface Props {
    oid: string
    type: string
}

export const Comments: React.FC<Props> = ({ oid, type }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(
            commentsActions.loadComments({
                oid,
                type,
            })
        )
    }, [oid, type])
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}
        >
            <CommentList oid={oid} type={type} />
            <CommentForm oid={oid} type={type} />
        </Box>
    )
}
