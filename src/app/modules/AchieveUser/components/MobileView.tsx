import { Delete as DeleteIcon } from '@mui/icons-material'
import * as Icons from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IAchieve } from 'types/IAchieve'
import { checkAdminAccess } from 'utils/roles'

import { achieveUserActions } from '../slice'

interface MobileViewProps {
    achieve: IAchieve
}

export const MobileView: React.FC<MobileViewProps> = ({ achieve }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const Icon = Icons[achieve.icon]
    const dispatch = useDispatch()

    const profileRole = useSelector(selectProfileRole)

    const handleDeleteOpen = () => {
        dispatch(achieveUserActions.showDeleteModal(achieve))
    }

    return (
        <Box width={'100%'} display="flex" justifyContent="space-between" gap={1}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        borderRadius: 8,
                        p: 1,
                        display: 'flex',
                        color: '#fff',
                        backgroundColor: achieve.color,
                    }}
                >
                    {Icon && <Icon />}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body1" fontWeight={600}>
                        {achieve.label}
                    </Typography>
                    <Typography variant="body3" color="gray.700">
                        {achieve.user?.description || achieve.description}
                    </Typography>
                </Box>
            </Box>

            {checkAdminAccess(profileRole) && (
                <IconButton color="error" onClick={handleDeleteOpen}>
                    <DeleteIcon />
                </IconButton>
            )}
        </Box>
    )
}
