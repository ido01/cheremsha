import { Typography } from '@mui/material'
import React from 'react'
import { IExcel } from 'types/IExcel'

interface ExcelSizeRowProps {
    item: IExcel
}

export const ExcelSizeRow: React.FC<ExcelSizeRowProps> = ({ item }) => (
    <Typography variant="body2" color="grey.600">
        {item.size}
    </Typography>
)
