import { MoreVert as MoreVertIcon, Search as SearchIcon } from '@mui/icons-material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Container, IconButton, Tab, TextField } from '@mui/material'
import { BreadcrumbItem } from 'app/components/Breadcrumbs'
import { categoriesActions } from 'app/modules/Categories/slice'
import { selectCategoryById } from 'app/modules/Categories/slice/selectors'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Matrix } from '../components/Matrix'
import { matrixActions } from '../slice'
import { selectMatrix, selectMatrixEmpty, selectMatrixNoempty } from '../slice/selectors'
import { MatrixAdminSettings } from './MatrixAdminSettings'
import { MatrixForm } from './MatrixForm'
import { MatrixView } from './MatrixView'
import { SendModal } from './SendModal'
import { UsersModal } from './UsersModal'

export const MatrixCategoriesView: React.FC = () => {
    const { id } = useParams<{ id?: string }>()
    const dispatch = useDispatch()

    const [value, setValue] = useState<string>('all')
    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const getMatrix = useSelector(selectMatrix)
    const matrix = getMatrix(id || '0')
    const getMatrixEmpty = useSelector(selectMatrixEmpty)
    const empty = getMatrixEmpty(id || '0')
    const getMatrixNoepty = useSelector(selectMatrixNoempty)
    const noempty = getMatrixNoepty(id || '0')
    const getCategory = useSelector(selectCategoryById)
    const category = getCategory(id || '0')
    const parentCategory = getCategory(category?.parentId || '0')
    const checkStatickRole = useSelector(selectCheckAccess)

    const filteredMatrix = useMemo(() => {
        return matrix.filter(
            (m) => m.position.toString().includes(search) || m.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [search, matrix])

    const breadcrumbsItems: BreadcrumbItem[] = [
        {
            text: 'Матрица',
            link: '/matrix',
        },
    ]

    let breadcrumbsItemsMobile: BreadcrumbItem = {
        text: 'Матрица',
        link: '/matrix',
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
        if (id) {
            dispatch(
                categoriesActions.loadCategories({
                    id,
                })
            )
        }
    }, [id])

    const handleSettingOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSearchChange = (e: any) => {
        const { value } = e.target
        setSearch(value)
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            const m = matrix.find(
                (m) => m.position.toString() === search || m.name.toLowerCase().includes(search.toLowerCase())
            )
            if (m) {
                dispatch(matrixActions.showModal(m.id))
            }
        }
    }

    return (
        <Main
            title={category?.name || 'Матрица'}
            breadcrumbs={breadcrumbsItems}
            breadcrumbsItemsMobile={breadcrumbsItemsMobile}
            endNode={
                checkStatickRole('update_matrix') ? (
                    <IconButton aria-label="more" id="long-button" aria-haspopup="true" onClick={handleSettingOpen}>
                        <MoreVertIcon />
                    </IconButton>
                ) : undefined
            }
            searchDisabled
        >
            <Container>
                <TabContext value={value}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: {
                                xs: 'column-reverse',
                                sm: 'row',
                            },
                        }}
                    >
                        <TabList onChange={handleChange}>
                            <Tab label="Все" value="all" sx={{ px: 3 }} />
                            <Tab label="Пусто" value="empty" sx={{ px: 3 }} />
                            <Tab label="Еще есть" value="noempty" sx={{ px: 3 }} />
                        </TabList>

                        <TextField
                            placeholder={'Поиск'}
                            variant="filled"
                            value={search || ''}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            sx={{
                                borderRadius: 8,
                                overflow: 'hidden',
                            }}
                            InputProps={{
                                disableUnderline: true,
                                startAdornment: <SearchIcon style={{ color: '#c7c7cc' }} />,
                                sx: {
                                    borderRadius: '32px',
                                },
                            }}
                        />
                    </Box>
                    <TabPanel value="all" sx={{ p: 0 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                pt: 1,
                                gap: 1,
                                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr', lg: '1fr 1fr 1fr' },
                            }}
                        >
                            {search
                                ? filteredMatrix.map((m, key) => <Matrix key={key} matrix={m} />)
                                : matrix.map((m, key) => <Matrix key={key} matrix={m} />)}
                        </Box>
                    </TabPanel>
                    <TabPanel value="empty" sx={{ p: 0 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                pt: 1,
                                gap: 1,
                                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr', lg: '1fr 1fr 1fr' },
                            }}
                        >
                            {search
                                ? filteredMatrix.map((m, key) => <Matrix key={key} matrix={m} />)
                                : empty.map((m, key) => <Matrix key={key} matrix={m} />)}
                        </Box>
                    </TabPanel>
                    <TabPanel value="noempty" sx={{ p: 0 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                pt: 1,
                                gap: 1,
                                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr', lg: '1fr 1fr 1fr' },
                            }}
                        >
                            {search
                                ? filteredMatrix.map((m, key) => <Matrix key={key} matrix={m} />)
                                : noempty.map((m, key) => <Matrix key={key} matrix={m} />)}
                        </Box>
                    </TabPanel>
                </TabContext>
            </Container>

            <MatrixView />
            <UsersModal />
            <SendModal />

            {checkStatickRole('update_matrix') && (
                <>
                    <MatrixAdminSettings open={open} id={id} category={category} handleClose={handleClose} />
                    <MatrixForm />
                </>
            )}
        </Main>
    )
}
