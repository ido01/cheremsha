import { Box } from '@mui/material'
import React, { ReactNode } from 'react'

export const ListLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                position: 'fixed',
                flexDirection: 'column',
                width: '100vw',
                height: '100vh',
                top: 0,
                left: 0,
                backgroundColor: '#fff',
                overflow: 'hidden',
            }}
        >
            {children}
        </Box>
    )
}
