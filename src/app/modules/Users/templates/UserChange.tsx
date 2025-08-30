import { Box } from '@mui/material'
import { BreadcrumbItem } from 'app/components/Breadcrumbs'
import { Main } from 'app/modules/Layout/templates/Main'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { UserDataForm } from '../components/UserDataForm'
import { usersActions } from '../slice'
import { selectUserById } from '../slice/selectors'

export const UserChange: React.FC = () => {
    const dispatch = useDispatch()
    const { id } = useParams<{ id: string }>()

    const getUser = useSelector(selectUserById)
    const user = getUser(id)

    const imageSrc = user?.avatar?.url || ''
    const userName = user?.name

    const breadcrumbsItems: BreadcrumbItem[] = [
        {
            text: 'Сотрудники',
            link: '/users',
        },
    ]

    const breadcrumbsItemsMobile: BreadcrumbItem = {
        text: 'Сотрудники',
        link: '/users',
    }

    if (user) {
        breadcrumbsItems.push({
            text: '',
        })
    }

    useEffect(() => {
        dispatch(usersActions.loadUser(id))
    }, [])

    return (
        <Main
            title={user?.name || 'Сотрудники'}
            breadcrumbs={breadcrumbsItems}
            breadcrumbsItemsMobile={breadcrumbsItemsMobile}
        >
            <Box display={'flex'} sx={{ px: { sm: 0, md: 2 } }}>
                <AvatarImage name={userName} image={imageSrc} size={'70px'} />
            </Box>

            <Box sx={{ mt: 5, px: { sm: 0, md: 2 } }}>
                <UserDataForm />
            </Box>
        </Main>
    )
}
