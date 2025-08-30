import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { BreadcrumbItem } from 'app/components/Breadcrumbs'
import { CategoryAdminSettings } from 'app/modules/Categories/components/CategoryAdminSettings'
import { CategoriesBigList } from 'app/modules/Categories/templates/CategoriesBigList'
import { documentsActions } from 'app/modules/Documents/slice'
import { DocumentModal } from 'app/modules/Documents/templates/DocumentModal'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ERole } from 'types'

import { FilterBlock } from '../components/FilterBlock'

export const TasksList: React.FC = () => {
    const dispatch = useDispatch()

    const { id } = useParams<{ id?: string }>()

    const [open, setOpen] = useState<boolean>(false)

    const profileRole = useSelector(selectProfileRole)

    const breadcrumbsItems: BreadcrumbItem[] = [
        {
            text: 'Задачи',
            link: '/tasks',
        },
    ]

    useEffect(() => {
        dispatch(documentsActions.loadDocuments('task'))
    }, [])

    const handleSettingOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Main
            title={'Задачи'}
            breadcrumbs={breadcrumbsItems}
            searchDisabled
            endNode={
                profileRole === ERole.ADMIN ? (
                    <IconButton
                        sx={{ ml: 2 }}
                        aria-label="more"
                        id="long-button"
                        aria-haspopup="true"
                        onClick={handleSettingOpen}
                    >
                        <MoreVertIcon />
                    </IconButton>
                ) : undefined
            }
        >
            <FilterBlock />
            <CategoriesBigList />

            <DocumentModal />

            {profileRole === ERole.ADMIN && <CategoryAdminSettings open={open} id={id} handleClose={handleClose} />}
        </Main>
    )
}
