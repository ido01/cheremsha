import {
    Group as GroupIcon,
    Home as HomeIcon,
    School as SchoolIcon,
    SportsEsports as SportsEsportsIcon,
} from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { selectProfile } from 'app/modules/Profile/slice/selectors'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { TMenuItem } from 'types/TMenuItem'

export const MobileNavigation: React.FC = () => {
    const history = useHistory()

    const { url } = useRouteMatch()

    const profile = useSelector(selectProfile)

    const menuItems: TMenuItem[] = [
        {
            icon: <HomeIcon />,
            title: 'Главная',
            path: '/',
            id: 0,
        },
        {
            icon: <GroupIcon />,
            title: 'Сотрудники',
            path: '/peoples',
            id: 1,
        },
        {
            icon: <SchoolIcon />,
            title: 'Документы',
            path: '/doc',
            id: 2,
        },
        // {
        //     icon: <TaskAltIcon />,
        //     title: 'Задачи',
        //     path: '/taskList',
        //     id: 3,
        // },
        {
            icon: <SportsEsportsIcon />,
            title: 'Игры',
            path: '/game',
            id: 4,
        },
        {
            icon: <AvatarImage name={profile.name} image={profile.avatar?.thumb} size={35} />,
            title: 'Профиль',
            path: '/profile',
        },
        // {
        //     icon: <QuizIcon />,
        //     title: 'Гайд',
        //     path: '/faq',
        //     id: 1,
        // },
        // {
        //     icon: <SchoolIcon />,
        //     title: 'Обучение',
        //     path: '/school',
        //     id: 2,
        // },
        // {
        //     icon: <StackedLineChartIcon />,
        //     title: 'Мотивация',
        //     path: '/motivation',
        // },
    ]

    const handleClick = (item: TMenuItem) => {
        if (item.path) {
            history.push(item.path)
        }
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: '12px',
                left: 0,
                m: 1,
                width: 'calc( 100% - 16px )',
                p: 1,
                zIndex: 2,
                borderRadius: 8,
                backdropFilter: 'blur(4px)',
                bgcolor: '#FDFDFD30',
                boxShadow: '0px 4px 4px #3332',
                border: '1px solid #F5F5F5',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                {menuItems.map((item, index) => {
                    const isActive =
                        item.path === '/'
                            ? url === '/'
                                ? true
                                : false
                            : item.path
                            ? url.indexOf(item.path) !== -1
                            : false
                    return (
                        <IconButton
                            key={index}
                            onClick={() => handleClick(item)}
                            sx={{
                                width: '44px',
                                height: '44px',
                                bgcolor: '#FDFDFD90',
                                color: isActive ? '#6261a3' : 'grey.700',
                            }}
                        >
                            {item.icon}
                        </IconButton>
                    )
                })}
            </Box>
        </Box>
    )
}
