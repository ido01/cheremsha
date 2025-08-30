import { Close as CloseIcon } from '@mui/icons-material'
import { Box, Drawer, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

interface ModalProps {
    children: React.ReactNode
    open: boolean
    title: string | React.ReactNode
    handleClose: () => void
}

export const Modal: React.FC<ModalProps> = ({ children, open, title, handleClose }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    return (
        <Drawer
            open={open}
            anchor={'bottom'}
            PaperProps={{
                sx: {
                    width: { xs: '100%', md: '90%' },
                    height: 'calc(100% - 40px)', //{ xs: 'calc(100% - 40px)', md: '100%' },
                    margin: '0 auto',
                    borderTopLeftRadius: '32px', //{ xs: '10px', md: '0px' },
                    borderTopRightRadius: '32px', //{ xs: '10px', md: '0px' },
                    maxWidth: '100%',
                },
            }}
            onClose={handleClose}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    userSelect: 'none',
                    position: 'relative',
                }}
            >
                <Box position={'absolute'} top={0} width={'100%'} zIndex={2}>
                    <Box
                        display={'flex'}
                        flexShrink={0}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        sx={{
                            borderRadius: 8,
                            bgcolor: '#FDFDFD30',
                            boxShadow: '0px 4px 4px #3332',
                            p: 1,
                            pl: 3,
                            m: { sm: 1, md: 0.5 },
                            backdropFilter: 'blur(4px)',
                            border: '1px solid #F5F5F5',
                        }}
                    >
                        <Typography
                            sx={{ fontWeight: 500, textTransform: 'uppercase' }}
                            variant={isMobile ? 'h6' : 'h5'}
                        >
                            {title}
                        </Typography>

                        <IconButton sx={{ bgcolor: '#FDFDFD90' }} onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>

                {children}
            </Box>
        </Drawer>
    )
}
