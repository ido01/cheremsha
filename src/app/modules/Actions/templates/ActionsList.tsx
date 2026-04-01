import { FilterAlt as FilterAltIcon } from '@mui/icons-material'
import { Box, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import Table from 'app/components/Table'
import { Main } from 'app/modules/Layout/templates/Main'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { usersActions } from 'app/modules/Users/slice'
import { UserModal } from 'app/modules/Users/templates/UserModal'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IAction } from 'types/IAction'
import { TLimit, TTableOrder, TTableRowData } from 'types/ITableDisplay'

import { FilterBlock } from '../components/FilterBlock'
import { MobileActionView } from '../components/MobileActionView'
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
            title: 'Метод',
            name: 'method',
            xs: 6,
            element: (action: IAction) => (
                <Box display={'flex'} gap={2} alignItems={'center'} sx={{ overflow: 'hidden' }}>
                    <Box
                        sx={{
                            px: 1,
                            py: 0.5,
                            borderRadius: 8,
                            backgroundColor:
                                action.method === 'PATCH'
                                    ? '#FFCC80'
                                    : action.method === 'DELETE'
                                    ? '#FF8A65'
                                    : action.method === 'GET'
                                    ? '#A5D6A7'
                                    : action.method === 'POST'
                                    ? '#4FC3F7'
                                    : '#B0BEC5',
                            color:
                                action.method === 'PATCH'
                                    ? '#E65100'
                                    : action.method === 'DELETE'
                                    ? '#BF360C'
                                    : action.method === 'GET'
                                    ? '#1B5E20'
                                    : action.method === 'POST'
                                    ? '#01579B'
                                    : '#263238',
                            borderBottom: `2px solid ${
                                action.method === 'PATCH'
                                    ? '#E65100'
                                    : action.method === 'DELETE'
                                    ? '#BF360C'
                                    : action.method === 'GET'
                                    ? '#1B5E20'
                                    : action.method === 'POST'
                                    ? '#01579B'
                                    : '#263238'
                            }`,
                            fontSize: '14px',
                            fontWeight: 600,
                        }}
                    >
                        {action.method}
                    </Box>

                    <Typography
                        variant="body1"
                        color="grey.900"
                        sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            width: '100%',
                        }}
                    >
                        {action.url}
                    </Typography>
                </Box>
            ),
        },
        {
            title: 'Дата создания',
            name: 'createdAt',
            xs: 2,
            element: (action: IAction) => (
                <Typography variant="body2" color="grey.600">
                    {dayjs(action.createdAt).locale('ru').format('D MMM YYYY H:m')}
                </Typography>
            ),
        },
        {
            title: 'Пользователь',
            name: 'uid',
            xs: 4,
            element: (action: IAction) => (
                <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'} width={'100%'}>
                    <Box mr={2}>
                        <Typography variant="body2">{`${action.user.last_name} ${action.user.name}`}</Typography>
                    </Box>

                    <AvatarImage
                        name={`${action.user.last_name} ${action.user.name}`}
                        image={action.user.avatar?.thumb}
                        size={36}
                        achieve={action.user.achieve}
                    />
                </Box>
            ),
        },
    ]

    const mobileView = (item: IAction) => <MobileActionView action={item} />

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

    const handleClickRow = (action: IAction) => {
        dispatch(usersActions.userLoaded(action.user))
        dispatch(usersActions.setActiveId(action.uid))
        dispatch(usersActions.showModal())
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
                    handleClickRow={handleClickRow}
                />

                <UserModal />
            </Box>
        </Main>
    )
}
