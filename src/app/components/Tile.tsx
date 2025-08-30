import { Box, Typography } from '@mui/material'
import React from 'react'

export interface ITile {
    icon: React.ReactNode
    title: string
    path: string
}

interface ITileProps {
    data: ITile
    onClick: (data: ITile) => void
}

export const Tile: React.FC<ITileProps> = ({ data, onClick }) => (
    <Box
        sx={{
            width: '100%',
            height: '100%',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#FDFDFD',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            gap: 4,
            cursor: 'pointer',
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
            '&:hover': {
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
            },
        }}
        onClick={() => onClick(data)}
    >
        {data.icon}
        <Typography variant="h6" textAlign="center">
            {data.title}
        </Typography>
    </Box>
)
