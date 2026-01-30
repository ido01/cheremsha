import { Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { IExcel } from 'types/IExcel'

interface ExcelDateRowProps {
    item: IExcel
}

export const ExcelDateRow: React.FC<ExcelDateRowProps> = ({ item }) => (
    <Typography variant="body2" color="grey.600">
        {dayjs(item.createdAt).locale('ru').format('D MMM YYYY')}
    </Typography>
)
