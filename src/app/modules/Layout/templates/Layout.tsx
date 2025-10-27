import { MantineProvider } from '@mantine/core'
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material'
import { Auth } from 'app/modules/Auth/templates/Auth'
import { FavoriteModal } from 'app/modules/Favorites/templates/FavoriteModal'
import { selectStatus } from 'app/modules/Profile/slice/selectors'
import { selectStatus as selectSettingsStatus } from 'app/modules/Settings/slice/selectors'
import { Settings } from 'app/modules/Settings/templates/Settings'
import React from 'react'
import { useSelector } from 'react-redux'
import { EStatus } from 'types'

import { LeftMenu } from '../components/LeftMenu'
import { MobileNavigation } from '../components/MobileNavigation'

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const status = useSelector(selectStatus)
    const settingsStatus = useSelector(selectSettingsStatus)

    return (
        <MantineProvider>
            <Settings>
                <Auth>
                    {status !== EStatus.FINISHED || settingsStatus !== EStatus.FINISHED ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                            <CircularProgress size={50} />
                        </Box>
                    ) : (
                        <Box display="flex" height={'100%'}>
                            {!isMobile && <LeftMenu />}

                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                flex={'1 1 auto'}
                                maxHeight={'100vh'}
                                overflow={'auto'}
                                sx={{
                                    position: 'relative',
                                    bgcolor: '#FFF',
                                    borderRadius: 8,
                                    m: { sm: 0, md: 1 },
                                    boxSizing: 'border-box',
                                    border: !isMobile ? '1px solid #EEEEEE' : undefined,
                                    height: { sm: 'calc( 100vh - 2px )', md: 'calc( 100vh - 18px )' },
                                }}
                            >
                                <Box display="flex" flexDirection="column" minHeight="calc( 100vh - 18px )">
                                    {children}
                                </Box>
                            </Box>

                            <FavoriteModal />

                            {isMobile && <MobileNavigation />}
                        </Box>
                    )}
                </Auth>
            </Settings>
        </MantineProvider>
    )
}
