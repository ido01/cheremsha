import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

interface SettingsModalProps {
    children: React.ReactNode
    open: boolean
    handleClose: () => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ open, children, handleClose }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    return (
        <Drawer
            anchor={isMobile ? 'bottom' : 'right'}
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    borderRadius: 8,
                    m: 1,
                    p: 1,
                    maxHeight: 'calc( 100vh - 16px )',
                },
            }}
        >
            <Box
                sx={{ width: isMobile ? 'auto' : 350 }}
                role="presentation"
                onClick={handleClose}
                onKeyDown={handleClose}
            >
                {children}
            </Box>
        </Drawer>
    )
}
