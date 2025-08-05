import { Rocket as RocketIcon, SportsEsports as SportsEsportsIcon, Widgets as WidgetsIcon } from '@mui/icons-material'
import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material'
import { ITile, Tile } from 'app/components/Tile'
import { TitleBlock } from 'app/components/TitleBlock'
import React from 'react'
import { useHistory } from 'react-router-dom'

export const GameList: React.FC = () => {
    const history = useHistory()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const links: ITile[] = [
        {
            icon: <RocketIcon fontSize="large" />,
            title: 'Space',
            path: '/game/space',
        },
        {
            icon: <WidgetsIcon fontSize="large" />,
            title: 'Собери белый свет',
            path: '/game/do_white',
        },
        {
            icon: <SportsEsportsIcon fontSize="large" />,
            title: 'Лишний цвет',
            path: '/game/find_color',
        },
    ]

    const handleClickRow = (item: ITile) => {
        history.push(item.path)
    }

    return (
        <>
            <TitleBlock title={'Игры'} searchDisabled />

            <Box
                flex="1 0 100%"
                sx={{
                    pt: 2,
                    pb: 1,
                    bgcolor: isMobile ? 'grey.200' : 'grey.50',
                    overflow: 'auto',
                    maxHeight: { md: 'calc( 100vh - 90px )' },
                }}
            >
                <Container>
                    <Grid container spacing={2}>
                        {links.map((link, index) => (
                            <Grid item key={index} xs={isMobile ? 6 : 4}>
                                <Tile data={link} onClick={handleClickRow} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    )
}
