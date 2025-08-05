import { Agriculture as AgricultureIcon, Poll as PollIcon } from '@mui/icons-material'
import { Box, Container, Grid, useMediaQuery, useTheme } from '@mui/material'
import { ITile, Tile } from 'app/components/Tile'
import { TitleBlock } from 'app/components/TitleBlock'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ERole } from 'types'

export const AdminList: React.FC = () => {
    const history = useHistory()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const profileRole = useSelector(selectProfileRole)

    const links: ITile[] = []
    if (profileRole === ERole.ADMIN) {
        links.push({
            icon: <PollIcon fontSize="large" />,
            title: 'Опрос',
            path: '/polls',
        })

        links.push({
            icon: <AgricultureIcon fontSize="large" />,
            title: 'Должности',
            path: '/positions',
        })
    }

    const handleClickRow = (item: ITile) => {
        history.push(item.path)
    }

    return (
        <>
            <TitleBlock title={'Админка'} searchDisabled />

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
                            <Grid item key={index} xs={isMobile ? 6 : 3}>
                                <Tile data={link} onClick={handleClickRow} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    )
}
