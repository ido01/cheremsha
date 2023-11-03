import { Rocket as RocketIcon, SportsEsports as SportsEsportsIcon, Widgets as WidgetsIcon } from '@mui/icons-material'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import Table from 'app/components/Table'
import { TitleBlock } from 'app/components/TitleBlock'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { TTableRowData } from 'types/ITable'

interface ILink {
    id: string
    icon: React.ReactNode
    title: string
    path: string
}

export const GameList: React.FC = () => {
    const history = useHistory()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const links: ILink[] = [
        {
            id: '3',
            icon: <RocketIcon />,
            title: 'Space',
            path: '/game/space',
        },
        {
            id: '2',
            icon: <WidgetsIcon />,
            title: 'Собери белый свет',
            path: '/game/do_white',
        },
        {
            id: '1',
            icon: <SportsEsportsIcon />,
            title: 'Лишний цвет',
            path: '/game/find_color',
        },
    ]

    const tableRows: TTableRowData[] = [
        {
            title: 'Название',
            name: 'name',
            xs: 12,
            element: (item: ILink) => (
                <Box display={'flex'} alignItems={'center'} pl={1}>
                    {item.icon}

                    <Typography variant="body1" sx={{ ml: item.icon ? 2 : 5 }}>
                        {item.title}
                    </Typography>
                </Box>
            ),
        },
    ]

    const handleClickRow = (item: ILink) => {
        history.push(item.path)
    }

    return (
        <>
            <TitleBlock title={'Игры'} />

            <Box
                flex="1 0 100%"
                sx={{ pt: isMobile ? 0 : 4, overflow: 'auto', maxHeight: { md: 'calc( 100vh - 90px )' } }}
            >
                <Table items={links} rows={tableRows} handleClickRow={handleClickRow} />
            </Box>
        </>
    )
}
