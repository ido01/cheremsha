import { Box } from '@mui/material'
import React from 'react'

import { ITable } from '../types'
import { TableListItem } from './TableListItem'

export const TablesList: React.FC<{ data: ITable[]; height: number }> = ({ data, height }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '32px',
                left: 0,
                width: '50px',
                background: 'linear-gradient(to right, #fff 25%, transparent)',
                zIndex: 1,
            }}
        >
            {data.map((table, index) => (
                <TableListItem key={`TablesList_${index}`} table={table} height={height} />
            ))}
        </Box>
    )
}
