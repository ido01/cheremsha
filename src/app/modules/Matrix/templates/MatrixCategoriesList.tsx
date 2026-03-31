import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import * as Icons from '@mui/icons-material'
import { Box, Grid, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { ITile, Tile } from 'app/components/Tile'
import { CategoryMainAdminSettings } from 'app/modules/Categories/components/CategoryMainAdminSettings'
import { categoriesActions } from 'app/modules/Categories/slice'
import { selectCategories } from 'app/modules/Categories/slice/selectors'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const MatrixCategoriesList: React.FC = () => {
    const dispatch = useDispatch()

    const history = useNavigate()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const [open, setOpen] = useState<boolean>(false)
    const getCategories = useSelector(selectCategories)
    const checkStatickRole = useSelector(selectCheckAccess)

    const categories = getCategories('0', 'matrix')

    const handleSettingOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        dispatch(
            categoriesActions.loadCategories({
                id: '0',
                path: 'matrix',
            })
        )
    }, [])

    const handleClickRow = (item: ITile) => {
        if (item.path) {
            history(item.path)
        }
        item.onClick?.()
    }

    return (
        <Main
            title={'Матрицы'}
            searchDisabled
            endNode={
                checkStatickRole('update_main_matrix') ? (
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
            <Box
                sx={{
                    pb: 11,
                }}
            >
                <Grid container spacing={2}>
                    {categories.map((category, index) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const Icon = Icons[category.icon]
                        return (
                            <Grid item key={index} xs={isMobile ? 6 : 3}>
                                <Tile
                                    data={{
                                        title: category.name,
                                        icon: Icon ? <Icon fontSize="large" /> : <></>,
                                        path: `/matrix/${category.id}`,
                                    }}
                                    onClick={handleClickRow}
                                />
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>

            {checkStatickRole('update_main_matrix') && (
                <CategoryMainAdminSettings path="matrix" open={open} handleClose={handleClose} />
            )}
        </Main>
    )
}
