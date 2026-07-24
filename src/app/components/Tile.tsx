import { Box, Typography } from '@mui/material'
import React from 'react'

export interface ITile {
    icon: React.ReactNode
    title: string
    path?: string
    onClick?: () => void
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
            bgcolor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            gap: 4,
            cursor: 'pointer',
            border: '1px solid #E0E0E0',
            '&:hover': {
                bgcolor: '#F5F5F5',
                border: '1px solid #D0D0D0',
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
