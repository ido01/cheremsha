import { FilterAlt as FilterAltIcon } from '@mui/icons-material'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import Table, { TableEmptyRow } from 'app/components/Table'
import { documentsActions } from 'app/modules/Documents/slice'
import { selectDocumentById } from 'app/modules/Documents/slice/selectors'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectLocation } from 'app/modules/Locations/slice/selectors'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { EState, EStatus } from 'types'
import { TLimit, TTableOrder, TTableRowData } from 'types/ITableDisplay'
import { IUser } from 'types/IUser'
import { convertDocumentResultState } from 'utils/convertUtils'

import { FilterBlock } from '../components/FilterBlock'
import { MobileResultView } from '../components/MobileResultView'
import { documentResultsActions } from '../slice'
import {
    selectFilter,
    selectOrder,
    selectPagination,
    selectResults,
    selectStatus,
    selectTotalCount,
} from '../slice/selectors'

export const DocumentResultList: React.FC = () => {
    const dispatch = useDispatch()

    const { id } = useParams<{ id: string }>()

    const [isFilterOpen, setFilterOpen] = useState<boolean>(false)

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    const status = useSelector(selectStatus)
    const results = useSelector(selectResults)
    const order = useSelector(selectOrder)
    const pagination = useSelector(selectPagination)
    const count = useSelector(selectTotalCount)
    const filter = useSelector(selectFilter)
    const getLocation = useSelector(selectLocation)
    const getDocument = useSelector(selectDocumentById)
    const document = getDocument(id || '')

    const tableRows: TTableRowData[] = [
        {
            title: 'Имя',
            name: 'name',
            xs: 5,
            element: (user: IUser) => (
                <>
                    <AvatarImage
                        name={`${user.last_name} ${user.name}`}
                        image={user.avatar?.thumb}
                        size={36}
                        achieve={user.achieve}
                    />

                    <Box ml={2}>
                        <Typography variant="body2">{`${user.last_name} ${user.name}`}</Typography>
                    </Box>
                </>
            ),
        },
        {
            title: 'Точка',
            name: 'place_id',
            xs: 2,
            element: (user: IUser) => (
                <>
                    {!!user.place_id && (
                        <Typography variant="body2" color="grey.600">
                            {getLocation(user.place_id)}
                        </Typography>
                    )}

                    {!user.place_id && <TableEmptyRow />}
                </>
            ),
        },
        {
            title: 'Должность',
            name: 'position',
            isSort: true,
            xs: 2,
            element: (user: IUser) => (
                <Typography variant="body2" color="grey.600">
                    {user.job}
                </Typography>
            ),
        },
        {
            title: 'Результат',
            name: 's.status',
            xs: 3,
            element: (user: IUser) => (
                <Typography
                    variant="body2"
                    sx={(theme) => ({
                        color:
                            !user.document || user.document.state === EState.INITIAL
                                ? theme.palette.error.main
                                : user.document.state === EState.PENDING
                                ? theme.palette.warning.main
                                : user.document.state === EState.COMPLETED
                                ? theme.palette.success.main
                                : theme.palette.success.main,
                    })}
                >
                    {convertDocumentResultState(user.document?.state || EState.INITIAL)}
                </Typography>
            ),
        },
    ]

    const mobileView = (item: IUser) => <MobileResultView user={item} />

    useEffect(() => {
        if (id) {
            dispatch(documentsActions.loadDocumentById(id))
        }
    }, [id])

    useEffect(() => {
        dispatch(documentResultsActions.cleanResults())
        dispatch(documentResultsActions.loadResults(id || ''))
    }, [filter])

    const handleOrderChange = (order: TTableOrder) => {
        dispatch(documentResultsActions.setOrder(order))
        dispatch(documentResultsActions.loadResults(id || ''))
    }

    const handlePageChange = (page: number) => {
        dispatch(documentResultsActions.setPage(page))
        dispatch(documentResultsActions.loadResults(id || ''))
    }

    const handleLimitChange = (limit: TLimit) => {
        dispatch(documentResultsActions.setLimit(limit))
        dispatch(documentResultsActions.loadResults(id || ''))
    }

    return (
        <Main
            title={document?.name || ''}
            count={count}
            value={filter.query}
            endNode={
                isMobile ? (
                    <Button variant="text" onClick={() => setFilterOpen(true)}>
                        <FilterAltIcon />
                    </Button>
                ) : (
                    <></>
                )
            }
            onSearch={(query) => {
                dispatch(
                    documentResultsActions.setFilter({
                        ...filter,
                        query,
                    })
                )
            }}
        >
            <FilterBlock open={isFilterOpen} onClose={() => setFilterOpen(false)} />

            <Table
                items={results}
                rows={tableRows}
                order={order}
                pagination={pagination}
                isLoading={status === EStatus.PENDING}
                mobileView={mobileView}
                handleOrderChange={handleOrderChange}
                handleLimitChange={handleLimitChange}
                handlePageChange={handlePageChange}
            />
        </Main>
    )
}
