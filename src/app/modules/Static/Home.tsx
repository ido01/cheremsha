import {
    AssistWalker as AssistWalkerIcon,
    Ballot as BallotIcon,
    CalendarMonth as CalendarMonthIcon,
    Contacts as ContactsIcon,
    ListAlt as ListAltIcon,
    LiveHelp as LiveHelpIcon,
    School as SchoolIcon,
    SportsEsports as SportsEsportsIcon,
    SsidChart as SsidChartIcon,
    TaskAlt as TaskAltIcon,
} from '@mui/icons-material'
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material'
import { ITile, Tile } from 'app/components/Tile'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Main } from '../Layout/templates/Main'
import { selectCheckAccess } from '../Role/selectors'

export const Home: React.FC = () => {
    const history = useNavigate()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const checkStatickRole = useSelector(selectCheckAccess)

    const links: ITile[] = [
        // {
        //     icon: <AvatarImage name={profile.name} image={profile.avatar?.thumb} size={'35px'} />,
        //     title: 'Профиль',
        //     path: '/profile',
        // },
        {
            icon: <CalendarMonthIcon fontSize="large" />,
            title: 'Календарь',
            path: '/events',
        },
        {
            icon: <ContactsIcon fontSize="large" />,
            title: 'Важные контакты',
            path: '/contacts',
        },
        {
            icon: <SchoolIcon fontSize="large" />,
            title: 'Документы',
            path: '/doc',
        },
        {
            icon: <SportsEsportsIcon fontSize="large" />,
            title: 'Игры',
            path: '/games',
        },
        {
            icon: <LiveHelpIcon fontSize="large" />,
            title: 'Обратная связь',
            path: '/reviews',
        },
    ]
    if (checkStatickRole('show_tables_list')) {
        if (checkStatickRole('hrzn_show_tables_list')) {
            links.push({
                icon: <ListAltIcon fontSize="large" />,
                title: 'Брони',
                onClick: () => {
                    location.href = '/list/hrzn'
                },
            })
        } else if (checkStatickRole('nsns_show_tables_list')) {
            links.push({
                icon: <ListAltIcon fontSize="large" />,
                title: 'Брони',
                onClick: () => {
                    location.href = '/list/nsns'
                },
            })
        } else {
            links.push({
                icon: <ListAltIcon fontSize="large" />,
                title: 'Брони',
                path: '/broni',
            })
        }

        links.push({
            icon: <SsidChartIcon fontSize="large" />,
            title: 'Статистика',
            path: '/stats',
        })
    }

    if (checkStatickRole('show_matrix')) {
        links.push({
            icon: <BallotIcon fontSize="large" />,
            title: 'Матрица',
            path: '/matrix',
        })
    }

    if (checkStatickRole('show_issue_list')) {
        links.push({
            icon: <TaskAltIcon fontSize="large" />,
            title: 'Задачи',
            path: '/issues',
        })
    }

    if (checkStatickRole('show_admin')) {
        links.push({
            icon: <AssistWalkerIcon fontSize="large" />,
            title: 'Админка',
            path: '/admin',
        })
    }

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
