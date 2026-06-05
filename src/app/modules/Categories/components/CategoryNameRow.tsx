import * as Icons from '@mui/icons-material'
import { Typography } from '@mui/material'
import React from 'react'
import { ICategory } from 'types/ICategory'

interface CategoryNameRowProps {
    item: ICategory
}

export const CategoryNameRow: React.FC<CategoryNameRowProps> = ({ item }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const Icon = Icons[item.icon || 'FolderOpen']
    return (
        <>
            <Icon />

            <Typography ml={1} variant="body2">
                {item.name}
            </Typography>
        </>
    )
}
