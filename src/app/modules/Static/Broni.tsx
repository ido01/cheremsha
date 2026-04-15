import {
    PanoramaPhotosphereSelect as PanoramaPhotosphereSelectIcon,
    SportsGymnastics as SportsGymnasticsIcon,
} from '@mui/icons-material'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { ITile, Tile } from 'app/components/Tile'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Main } from '../Layout/templates/Main'

export const Broni: React.FC = () => {
    const history = useNavigate()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const links: ITile[] = [
        {
            icon: <PanoramaPhotosphereSelectIcon fontSize="large" />,
            title: 'HRZN',
            onClick: () => {
                location.href = '/list/hrzn'
            },
        },
        {
            icon: <SportsGymnasticsIcon fontSize="large" />,
            title: 'NSNS',
            onClick: () => {
                location.href = '/list/nsns'
            },
        },
    ]

    const handleClickRow = (item: ITile) => {
        if (item.path) {
            history(item.path)
        }
        item.onClick?.()
    }

    return (
        <Main title={'Главная'} searchDisabled>
            <Box
                sx={{
                    pb: 11,
                }}
            >
                <Grid container spacing={2}>
                    {links.map((link, index) => (
                        <Grid item key={index} xs={isMobile ? 6 : 3}>
                            <Tile data={link} onClick={handleClickRow} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Main>
    )
}
