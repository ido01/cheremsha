import { FolderOpen as FolderOpenIcon } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { ICategory } from 'types/ICategory'

interface CategoryHeaderRowProps {
    item: ICategory
}

export const CategoryHeaderRow: React.FC<CategoryHeaderRowProps> = ({ item }) => (
    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Box display={'flex'} alignItems={'center'}>
            <FolderOpenIcon
                sx={{
                    color: '#6261a3',
                    mr: 1,
                }}
            />

            <Typography variant="h6" sx={{ fontSize: 20 }}>
                {item.name}
            </Typography>
        </Box>
    </Box>
)
