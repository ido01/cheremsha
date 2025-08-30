import { Box } from '@mui/material'
import { TitleBlock, TitleBlockProps } from 'app/components/TitleBlock'
import React from 'react'

interface MainProps extends TitleBlockProps {
    children: React.ReactNode
}

export const Main: React.FC<MainProps> = ({ children, ...props }) => {
    return (
        <>
            <TitleBlock {...props} />

            <Box
                pt={11}
                pb={{ sm: 11, md: 1 }}
                flex="1 0 100%"
                sx={{
                    px: { sm: 1, md: 1 },
                    overflow: 'auto',
                    maxHeight: 'calc( 100vh - 18px )',
                }}
            >
                {children}
            </Box>
        </>
    )
}
