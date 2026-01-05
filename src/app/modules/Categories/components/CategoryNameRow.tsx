import { FolderOpen as FolderOpenIcon } from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'
import { ICategory } from 'types/ICategory'

interface CategoryNameRowProps {
    item: ICategory
}

export const CategoryNameRow: React.FC<CategoryNameRowProps> = ({ item }) => (
    <>
        <FolderOpenIcon
            sx={{
                color: '#6261a3',
            }}
        />

        <Typography ml={1} variant="body2">
            {item.name}
        </Typography>
    </>
)
