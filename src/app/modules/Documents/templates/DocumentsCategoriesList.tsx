import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { BreadcrumbItem } from 'app/components/Breadcrumbs'
import { CategoryAdminSettings } from 'app/modules/Categories/components/CategoryAdminSettings'
import { categoriesActions } from 'app/modules/Categories/slice'
import { selectCategoryById } from 'app/modules/Categories/slice/selectors'
import { CategoriesList } from 'app/modules/Categories/templates/CategoriesList'
import { DocumentModal } from 'app/modules/Documents/templates/DocumentModal'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import { QuizModal } from 'app/modules/Quiz/templates/QuizModal'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { checkAdminAccess } from 'utils/roles'

export const DocumentsCategoriesList: React.FC = () => {
    const dispatch = useDispatch()

    const { id } = useParams<{ id?: string }>()

    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const profileRole = useSelector(selectProfileRole)
    const getCategory = useSelector(selectCategoryById)
    const category = getCategory(id || '0')
    const parentCategory = getCategory(category?.parentId || '0')

    const breadcrumbsItems: BreadcrumbItem[] = [
        {
            text: 'Документы',
            link: '/doc',
        },
    ]

    let breadcrumbsItemsMobile: BreadcrumbItem = {
        text: 'Документы',
        link: '/doc',
    }

    if (parentCategory) {
        breadcrumbsItems.push({
            text: parentCategory.name || '',
            link: `/doc/${parentCategory.id}`,
        })
        breadcrumbsItemsMobile = {
            text: parentCategory.name || '',
            link: `/doc/${parentCategory.id}`,
        }
    }

    if (category) {
        breadcrumbsItems.push({
            text: '',
        })
    }

    useEffect(() => {
        dispatch(categoriesActions.loadCategories(id || '0'))
        // dispatch(documentsActions.loadDocuments('faq'))
    }, [id])

    const handleSettingOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSearchChange = (e: string) => {
        setSearch(e)
    }

    return (
        <Main
            title={category?.name || 'Документы'}
            breadcrumbs={breadcrumbsItems}
            breadcrumbsItemsMobile={breadcrumbsItemsMobile}
            endNode={
                checkAdminAccess(profileRole) ? (
                    <IconButton
                        sx={{ bgcolor: '#FDFDFD90' }}
                        aria-label="more"
                        id="long-button"
                        aria-haspopup="true"
                        onClick={handleSettingOpen}
                    >
                        <MoreVertIcon />
                    </IconButton>
                ) : undefined
            }
            value={search}
            onSearch={handleSearchChange}
        >
            <CategoriesList id={id || '0'} search={search} />

            <DocumentModal />

            <QuizModal />

            {checkAdminAccess(profileRole) && (
                <CategoryAdminSettings open={open} id={id} category={category} handleClose={handleClose} />
            )}
        </Main>
    )
}
