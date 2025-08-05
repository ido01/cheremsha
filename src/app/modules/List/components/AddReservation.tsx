import { Add as AddIcon } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

import { ITime } from '../types'

export const AddReservation: React.FC<{ width: number; heightItem: number; left: number; time: ITime }> = ({
    width,
    heightItem,
    left,
    time,
}) => {
    const itemHeight = heightItem - 10
    const leftItem = left + 5

    const handleClick = () => {
        console.log('PDDTF handleClick')
    }
    return (
        <Box
            sx={{
                width: `${width - 10}px`,
                position: 'absolute',
                top: '5px',
                borderRadius: 2,
                height: `${itemHeight}px`,
                left: `${leftItem}px`,
                border: '1px solid #ccc',
                color: '#ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                gap: '2px',
            }}
            onClick={handleClick}
        >
            <Typography variant="body1" sx={{ color: '#aaa' }}>{`${
                time.hour < 10 ? `0${time.hour}` : time.hour
            }`}</Typography>
            <AddIcon />
            <Typography variant="body1" sx={{ color: '#aaa' }}>{`${
                time.minute < 10 ? `0${time.minute}` : time.minute
            }`}</Typography>
        </Box>
    )
}
