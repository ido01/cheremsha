import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { EStatus } from 'types'

import { selectFormStatus } from '../slice/selectors'

export const ExcelLoading: React.FC = () => {
    const status = useSelector(selectFormStatus)
    if (status !== EStatus.PENDING) {
        return null
    }
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                pb: '32px',
                zIndex: 9999,
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#75757590',
                    borderRadius: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#fff',
                    gap: 2,
                    py: 1,
                    px: 3,
                }}
            >
                <CircularProgress size={24} sx={{ color: '#fff' }} />
                <Typography variant="body1">Документы загружаются</Typography>
            </Box>
        </Box>
    )
}
