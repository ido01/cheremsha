import { Box } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

import { selectComments } from '../slice/selectors'
import { Comment } from './Comment'

interface Props {
    oid: string
    type: string
}

export const CommentList: React.FC<Props> = ({ oid, type }) => {
    const getComments = useSelector(selectComments)
    const comments = getComments(oid, type)

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}
        >
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </Box>
    )
}
