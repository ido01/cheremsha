import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import * as Icons from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { IAchieve } from 'types/IAchieve'

import { achieveActions } from '../slice'

interface MobileViewProps {
    achieve: IAchieve
}

export const MobileView: React.FC<MobileViewProps> = ({ achieve }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const Icon = Icons[achieve.icon]
    const dispatch = useDispatch()

    const handleDeleteOpen = () => {
        dispatch(achieveActions.showDeleteModal(achieve))
    }

    const handleUpdateOpen = () => {
        dispatch(achieveActions.openEditModal(achieve))
    }

    return (
        <Box px={2} width={'100%'} display="flex" flexDirection="column" gap={1}>
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
                        {achieve.description}
                    </Typography>
                </Box>
            </Box>

            <Box width="100%" display="flex" gap={2} justifyContent="space-between">
                <Button color="info" startIcon={<EditIcon />} onClick={handleUpdateOpen}>
                    Редактировать
                </Button>
                <Button color="error" startIcon={<DeleteIcon />} onClick={handleDeleteOpen}>
                    Удалить
                </Button>
            </Box>
        </Box>
    )
}
