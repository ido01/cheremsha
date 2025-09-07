import { Delete as DeleteIcon, Edit as EditIcon, MoreVert as MoreVertIcon } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import Table from 'app/components/Table'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { ITable } from 'types/ITable'
import { TTableRowData } from 'types/ITableDisplay'
import { checkAdminAccess } from 'utils/roles'

import { DeleteModal } from '../components/DeleteModal'
import { FormModal } from '../components/FormModal'
import { MobileView } from '../components/MobileView'
import { tablesActions } from '../slice'
import { selectStatus, selectTables } from '../slice/selectors'
import { Settings } from './Settings'

export const TablesList: React.FC = () => {
    const dispatch = useDispatch()

    const [open, setOpen] = useState<boolean>(false)

    const profileRole = useSelector(selectProfileRole)
    const status = useSelector(selectStatus)
    const tables = useSelector(selectTables)

    const handleSettingOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDeleteOpen = (table: ITable) => {
        dispatch(tablesActions.showDeleteModal(table))
    }

    const handleUpdateOpen = (table: ITable) => {
        dispatch(tablesActions.openEditModal(table))
    }

    const tableRows: TTableRowData[] = [
        {
            title: 'Стол',
            name: 'name',
            xs: 4,
            element: (table: ITable) => (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body1">{table.full_name}</Typography>
                    <Typography variant="body3">{table.name}</Typography>
                </Box>
            ),
        },
        {
            title: 'Короткое название',
            name: 'name',
            xs: 3,
            element: (table: ITable) => (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2">{table.short_name}</Typography>
                </Box>
            ),
        },
        {
            title: 'Мест',
            name: 'places',
            xs: 2,
            element: (table: ITable) => (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2">{table.places}</Typography>
                </Box>
            ),
        },
        {
            title: '',
            name: 'offices',
            xs: 3,
            element: (table: ITable) => (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                    }}
                >
                    <IconButton color="info" aria-haspopup="true" onClick={() => handleUpdateOpen(table)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" aria-haspopup="true" onClick={() => handleDeleteOpen(table)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ]

    const mobileView = (table: ITable) => <MobileView table={table} />

    useEffect(() => {
        dispatch(tablesActions.loadTables())
    }, [])

    return (
        <Main
            title={'Столы'}
            count={tables.length}
            searchDisabled
            endNode={
                checkAdminAccess(profileRole) ? (
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
            <Table
                items={tables}
                rows={tableRows}
                isLoading={status === EStatus.PENDING}
                mobileView={mobileView}
                // handleClickRow={handleClickRow}
            />

            {checkAdminAccess(profileRole) && (
                <>
                    <Settings open={open} handleClose={handleClose} />
                    <DeleteModal />
                    <FormModal />
                </>
            )}
        </Main>
    )
}
