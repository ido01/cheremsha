import { Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import Table from 'app/components/Table'
import { selectModal } from 'app/modules/Users/slice/selectors'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IAction } from 'types/IAction'
import { TLimit, TTableRowData } from 'types/ITableDisplay'

import { MobileActionView } from '../components/MobileActionView'
import { actionsActions } from '../slice'
import {
    selectActionsUser,
    selectFilterUser,
    selectOrder,
    selectPaginationUser,
    selectStatusUser,
} from '../slice/selectors'

export const UserActionsList: React.FC = () => {
    const dispatch = useDispatch()

    const { activeId } = useSelector(selectModal)
    const status = useSelector(selectStatusUser)
    const actions = useSelector(selectActionsUser)
    const order = useSelector(selectOrder)
    const pagination = useSelector(selectPaginationUser)
    const filter = useSelector(selectFilterUser)

    const tableRows: TTableRowData[] = [
        {
            title: 'Метод',
            name: 'method',
            xs: 8,
            element: (action: IAction) => (
                <Box display={'flex'} gap={2} alignItems={'center'}>
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

                    <Typography variant="body1" color="grey.900">
                        {action.url}
                    </Typography>
                </Box>
            ),
        },
        {
            title: 'Дата создания',
            name: 'createdAt',
            xs: 4,
            element: (action: IAction) => (
                <Typography variant="body2" color="grey.600">
                    {dayjs(action.createdAt).locale('ru').format('D MMM YYYY H:m')}
                </Typography>
            ),
        },
    ]

    const mobileView = (item: IAction) => <MobileActionView action={item} disabledUser />

    useEffect(() => {
        dispatch(actionsActions.cleanActionsUser())
    }, [activeId])

    useEffect(() => {
        dispatch(actionsActions.loadUserActions(activeId))
    }, [filter])

    const handlePageChange = (page: number) => {
        dispatch(actionsActions.setPageUser(page))
        dispatch(actionsActions.loadUserActions(activeId))
    }

    const handleLimitChange = (limit: TLimit) => {
        dispatch(actionsActions.setLimitUser(limit))
        dispatch(actionsActions.loadUserActions(activeId))
    }

    return (
        <Box display={'flex'} flexDirection={'column'} gap={4} mt={2}>
            <Stack direction={'row'} spacing={2} width={'100%'}>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                    <InputLabel>Тип запроса</InputLabel>
                    <Select
                        fullWidth
                        value={filter.method}
                        label="Тип запроса"
                        onChange={(e) => {
                            const { value } = e.target

                            dispatch(
                                actionsActions.setFilterUser({
                                    ...filter,
                                    method: value,
                                })
                            )
                        }}
                    >
                        {[
                            {
                                label: 'Все',
                                value: '',
                            },
                            {
                                label: 'GET',
                                value: 'GET',
                            },
                            {
                                label: 'POST',
                                value: 'POST',
                            },
                            {
                                label: 'PATCH',
                                value: 'PATCH',
                            },
                            {
                                label: 'DELETE',
                                value: 'DELETE',
                            },
                        ].map((gender, index) => (
                            <MenuItem key={index} value={gender.value}>
                                {gender.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>

            <Table
                items={actions}
                rows={tableRows}
                order={order}
                pagination={pagination}
                isLoading={status === EStatus.PENDING}
                mobileView={mobileView}
                handleLimitChange={handleLimitChange}
                handlePageChange={handlePageChange}
            />
        </Box>
    )
}
