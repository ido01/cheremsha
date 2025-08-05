import { Box } from '@mui/material'
import React, { ReactNode } from 'react'

export const ScrollList: React.FC<{ children: ReactNode; width: number; count: number }> = ({
    children,
    width,
    count,
}) => {
    return (
        <Box
            sx={{
                width: `${width * count}px`,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {children}
        </Box>
    )
}
