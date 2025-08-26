import { Typography } from '@mui/material'
import React from 'react'
import { EState } from 'types'
import { ICategory } from 'types/ICategory'
import { convertDocumentState } from 'utils/convertUtils'

interface CategoryStatusRow {
    item: ICategory
}

export const CategoryStatusRow: React.FC<CategoryStatusRow> = ({ item }) => (
    <Typography
        variant="body2"
        sx={(theme) => ({
            color: theme.palette.grey[600],
        })}
    >
        {convertDocumentState(EState.INITIAL)}
    </Typography>
)
