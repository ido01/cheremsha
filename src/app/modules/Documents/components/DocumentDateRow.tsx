import { Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { IDocument } from 'types/IDocument'

interface DocumentDateRowProps {
    item: IDocument
}

export const DocumentDateRow: React.FC<DocumentDateRowProps> = ({ item }) => (
    <Typography variant="body2" color="grey.600">
        {dayjs(item.createdAt).locale('ru').format('D MMM YYYY')}
    </Typography>
)
