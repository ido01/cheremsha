import { Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { ICategory } from 'types/ICategory'

interface CategoryDateRowProps {
    item: ICategory
}

export const CategoryDateRow: React.FC<CategoryDateRowProps> = ({ item }) => (
    <Typography variant="body2" color="grey.600">
        {dayjs(item.createdAt).locale('ru').format('D MMM YYYY')}
    </Typography>
)
