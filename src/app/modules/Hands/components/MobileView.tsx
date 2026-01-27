import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IHand } from 'types/IHand'

import { handsActions } from '../slice'

interface MobileViewProps {
    hand: IHand
}

export const MobileView: React.FC<MobileViewProps> = ({ hand }) => {
    const dispatch = useDispatch()

    const checkStatickRole = useSelector(selectCheckAccess)

    const handleDeleteOpen = () => {
        dispatch(handsActions.showDeleteModal(hand))
    }

    const handleUpdateOpen = () => {
        dispatch(handsActions.openEditModal(hand))
    }

    return (
        <Box px={2} width={'100%'} display="flex" flexDirection="column" gap={1}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0,
                }}
            >
                <Typography variant="body2" fontWeight={600}>
                    {`${hand.key_name}(${hand.role})`}
                </Typography>
                <Typography variant="caption">{hand.description}</Typography>
            </Box>

            {checkStatickRole('update_hands') && (
                <Box width="100%" display="flex" gap={2} justifyContent="space-between">
                    <Button color="info" startIcon={<EditIcon />} onClick={handleUpdateOpen}>
                        Редактировать
                    </Button>
                    <Button color="error" startIcon={<DeleteIcon />} onClick={handleDeleteOpen}>
                        Удалить
                    </Button>
                </Box>
            )}
        </Box>
    )
}
