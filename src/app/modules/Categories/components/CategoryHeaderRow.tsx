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
                sx={(theme) => ({
                    color: theme.palette.grey[600],
                })}
            />

            <Typography ml={1} variant="caption" color="grey.600">
                Название
            </Typography>
        </Box>

        <Typography ml={1} variant="body3" color="grey.600">
            {dayjs(item.createdAt).locale('ru').format('D MMM YYYY')}
        </Typography>
    </Box>
)
