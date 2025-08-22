import { Box, Switch, Typography } from '@mui/material'
import React, { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { ILocation } from 'types/ILocation'

import { locationsActions } from '../slice'

interface MobileViewProps {
    location: ILocation
}

export const MobileView: React.FC<MobileViewProps> = ({ location }) => {
    const dispatch = useDispatch()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            locationsActions.changeLocation({
                ...location,
                visible: event.target.checked,
            })
        )
    }

    return (
        <Box px={2} width={'100%'} display="flex" justifyContent="space-between" gap={1}>
            <Typography variant="body1" fontWeight={600}>
                {location.name}
            </Typography>

            <Switch checked={location.visible} onChange={handleChange} />
        </Box>
    )
}
