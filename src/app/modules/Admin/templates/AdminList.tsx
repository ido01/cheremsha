import {
    Agriculture as AgricultureIcon,
    Apartment as ApartmentIcon,
    Grade as GradeIcon,
    Key as KeyIcon,
    TableRestaurant as TableRestaurantIcon,
} from '@mui/icons-material'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { ITile, Tile } from 'app/components/Tile'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const AdminList: React.FC = () => {
    const history = useNavigate()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const checkStatickRole = useSelector(selectCheckAccess)

    const links: ITile[] = []
    if (checkStatickRole('show_admin')) {
        // links.push({
        //     icon: <PollIcon fontSize="large" />,
        //     title: 'Опрос',
        //     path: '/polls',
        // })

        if (checkStatickRole('show_positions')) {
            links.push({
                icon: <AgricultureIcon fontSize="large" />,
                title: 'Должности',
                path: '/positions',
            })
        }

        if (checkStatickRole('show_locations')) {
            links.push({
                icon: <ApartmentIcon fontSize="large" />,
                title: 'Точки',
                path: '/locations',
            })
        }

        if (checkStatickRole('show_achieve')) {
            links.push({
                icon: <GradeIcon fontSize="large" />,
                title: 'Ачивки',
                path: '/achieve',
            })
        }

        if (checkStatickRole('show_hands')) {
            links.push({
                icon: <KeyIcon fontSize="large" />,
                title: 'Доступы',
                path: '/hands',
            })
        }

        if (checkStatickRole('update_tables_list')) {
            links.push({
                icon: <TableRestaurantIcon fontSize="large" />,
                title: 'Столы',
                path: '/tables',
            })
        }
    }

    const handleClickRow = (item: ITile) => {
        if (item.path) {
            history(item.path)
        }
        item.onClick?.()
    }

    return (
        <Main title={'Админка'} searchDisabled>
            <Box pb={11}>
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
