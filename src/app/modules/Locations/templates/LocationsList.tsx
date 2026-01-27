import { Box, Switch, Typography } from '@mui/material'
import Table from 'app/components/Table'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { ILocation } from 'types/ILocation'
import { TTableRowData } from 'types/ITableDisplay'

import { MobileView } from '../components/MobileView'
import { locationsActions } from '../slice'
import { selectLocations, selectStatus } from '../slice/selectors'

export const LocationsList: React.FC = () => {
    const dispatch = useDispatch()

    const locations = useSelector(selectLocations)
    const status = useSelector(selectStatus)
    const checkStatickRole = useSelector(selectCheckAccess)

    const handleChange = (location: ILocation, event: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            locationsActions.changeLocation({
                ...location,
                visible: event.target.checked,
            })
        )
    }

    const tableRows: TTableRowData[] = [
        {
            title: 'Кто',
            name: 'name',
            xs: 9,
            element: (location: ILocation) => (
                <Box>
                    <Typography variant="body2">{location.name}</Typography>
                </Box>
            ),
        },
        {
            title: '',
            name: 'offices',
            xs: 3,
            element: (location: ILocation) => (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                    }}
                >
                    <Switch
                        disabled={!checkStatickRole('update_locations')}
                        checked={location.visible}
                        onChange={(e) => handleChange(location, e)}
                    />
                </Box>
            ),
        },
    ]

    const mobileView = (location: ILocation) => <MobileView location={location} />

    if (!checkStatickRole('show_locations')) {
        return null
    }

    return (
        <Main title={'Точки'} count={locations.length} searchDisabled>
            <Table
                items={locations}
                rows={tableRows}
                isLoading={status === EStatus.PENDING}
                mobileView={mobileView}
                // handleClickRow={handleClickRow}
            />
        </Main>
    )
}
