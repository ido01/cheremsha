import { Assignment as AssignmentIcon } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'
import { IDocument } from 'types/IDocument'

interface DocumentNameRowProps {
    item: IDocument
}

export const DocumentNameRow: React.FC<DocumentNameRowProps> = ({ item }) => (
    <>
        <AssignmentIcon
            sx={(theme) => ({
                color: theme.palette.grey[600],
            })}
        />

        <Typography ml={1} variant="body2">
            {item.name}
        </Typography>
    </>
)
