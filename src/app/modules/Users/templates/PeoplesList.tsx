import { Contacts as ContactsIcon, Group as GroupIcon } from '@mui/icons-material'
import { Grid, useMediaQuery, useTheme } from '@mui/material'
import { ITile, Tile } from 'app/components/Tile'
import { Main } from 'app/modules/Layout/templates/Main'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface ILink {
    icon: React.ReactNode
    title: string
    path: string
}

export const PeoplesList: React.FC = () => {
    const history = useNavigate()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const links: ILink[] = [
        {
            icon: <ContactsIcon fontSize="large" />,
            title: 'Важные контакты',
            path: '/contacts',
        },
        {
            icon: <GroupIcon fontSize="large" />,
            title: 'Все сотрудники',
            path: '/users',
        },
    ]

    const handleClickRow = (item: ITile) => {
        if (item.path) {
            history(item.path)
        }
        item.onClick?.()
    }

    return (
        <Main title={'Контакты'} searchDisabled>
            <Grid container spacing={2}>
                {links.map((link, index) => (
                    <Grid item key={index} xs={isMobile ? 6 : 4}>
                        <Tile data={link} onClick={handleClickRow} />
                    </Grid>
                ))}
            </Grid>
        </Main>
    )
}
