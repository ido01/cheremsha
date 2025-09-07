import { Box, Typography } from '@mui/material'
import React from 'react'
import { ICategory } from 'types/ICategory'

import { CategoryHeaderRow } from './CategoryHeaderRow'

interface MobileCategoryViewProps {
    item: ICategory
}

export const MobileCategoryView: React.FC<MobileCategoryViewProps> = ({ item }) => (
    <Box px={2} pb={2} pt={1} width={'100%'}>
        <CategoryHeaderRow item={item} />
        <Box mt={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
                <Typography variant="h6" sx={{ fontSize: 20 }}>
                    {item.name}
                </Typography>
            </Box>
        </Box>
    </Box>
)
