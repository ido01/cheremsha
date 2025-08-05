import { Box } from '@mui/material'
import { selectSettings } from 'app/modules/Settings/slice/selectors'
import React from 'react'
import { useSelector } from 'react-redux'

interface LogoProps {
    size?: 'small' | 'big'
}

export const Logo: React.FC<LogoProps> = ({ size }) => {
    const settings = useSelector(selectSettings)
    return (
        <Box
            pb={2}
            pr={size === 'big' ? 0 : 1}
            sx={{ width: size === 'big' ? '240px' : '140px' }}
            component={'img'}
            src={settings.logo}
        />
    )
}
