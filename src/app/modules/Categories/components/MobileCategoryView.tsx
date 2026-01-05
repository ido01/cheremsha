import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { ICategory } from 'types/ICategory'

import { CategoryHeaderRow } from './CategoryHeaderRow'

interface MobileCategoryViewProps {
    item: ICategory
}

export const MobileCategoryView: React.FC<MobileCategoryViewProps> = ({ item }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            px: 2,
            pb: 1,
            pt: 1,
            width: '100%',
        }}
    >
        <CategoryHeaderRow item={item} />

        <Typography variant="body3" color="grey.600">
            {dayjs(item.createdAt).locale('ru').format('D MMM YYYY')}
        </Typography>
    </Box>
)
