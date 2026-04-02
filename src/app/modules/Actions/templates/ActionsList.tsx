import { FilterAlt as FilterAltIcon } from '@mui/icons-material'
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import Table from 'app/components/Table'
import { Main } from 'app/modules/Layout/templates/Main'
import { UserModal } from 'app/modules/Users/templates/UserModal'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IAction } from 'types/IAction'
import { TLimit, TTableOrder, TTableRowData } from 'types/ITableDisplay'

import { DesctopAction } from '../components/DesctopAction'
import { FilterBlock } from '../components/FilterBlock'
import { MobileAction } from '../components/MobileAction'
import { actionsActions } from '../slice'
import { selectActions, selectFilter, selectOrder, selectPagination, selectStatus } from '../slice/selectors'

export const ActionsList: React.FC = () => {
    const dispatch = useDispatch()

    const [isFilterOpen, setFilterOpen] = useState<boolean>(false)

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const status = useSelector(selectStatus)
    const actions = useSelector(selectActions)
    const order = useSelector(selectOrder)
    const pagination = useSelector(selectPagination)
    const filter = useSelector(selectFilter)

    const tableRows: TTableRowData[] = [
        {
            title: 'Логи',
            name: 'method',
            xs: 12,
            element: (action: IAction) => <DesctopAction action={action} />,
        },
    ]

    const mobileView = (item: IAction) => <MobileAction action={item} />

    useEffect(() => {
        dispatch(actionsActions.cleanActions())
        dispatch(actionsActions.loadActions())
    }, [filter])

    const handleOrderChange = (order: TTableOrder) => {
        dispatch(actionsActions.setOrder(order))
        dispatch(actionsActions.loadActions())
    }

    const handlePageChange = (page: number) => {
        dispatch(actionsActions.setPage(page))
        dispatch(actionsActions.loadActions())
    }

    const handleLimitChange = (limit: TLimit) => {
        dispatch(actionsActions.setLimit(limit))
        dispatch(actionsActions.loadActions())
    }

    return (
        <Main
            title={'Логи'}
            value={filter.query}
            endNode={
                isMobile ? (
                    <IconButton onClick={() => setFilterOpen(true)} sx={{ bgcolor: '#FDFDFD90' }}>
                        <FilterAltIcon />
                    </IconButton>
                ) : (
                    <></>
                )
            }
            onSearch={(query) => {
                dispatch(
                    actionsActions.setFilter({
                        ...filter,
                        query,
                    })
                )
            }}
        >
            <Box
                sx={{
                    pb: 8,
                }}
            >
                <FilterBlock open={isFilterOpen} onClose={() => setFilterOpen(false)} />

                <Table
                    items={actions}
                    rows={tableRows}
                    order={order}
                    pagination={pagination}
                    isLoading={status === EStatus.PENDING}
                    mobileView={mobileView}
                    handleOrderChange={handleOrderChange}
                    handleLimitChange={handleLimitChange}
                    handlePageChange={handlePageChange}
                />

                <UserModal />
            </Box>
        </Main>
    )
}
