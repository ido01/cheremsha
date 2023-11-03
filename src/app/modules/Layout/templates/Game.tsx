import { Box } from '@mui/material'
import { Auth } from 'app/modules/Auth/templates/Auth'
import React from 'react'

interface QuizProps {
    children: React.ReactNode
}

export const Game: React.FC<QuizProps> = ({ children }) => {
    return (
        <Auth>
            <Box
                sx={{
                    bgcolor: 'grey.200',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    minHeight: '100vh',
                    alignItems: 'center',
                }}
            >
                {children}
            </Box>
        </Auth>
    )
}
