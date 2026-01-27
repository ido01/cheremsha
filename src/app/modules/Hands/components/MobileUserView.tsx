import { Delete as DeleteIcon } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IHandUser } from 'types/IHand'

import { handUserActions } from '../user'

interface MobileViewProps {
    hand: IHandUser
}

export const MobileUserView: React.FC<MobileViewProps> = ({ hand }) => {
    const dispatch = useDispatch()

    const checkStatickRole = useSelector(selectCheckAccess)

    const handleDeleteOpen = () => {
        dispatch(handUserActions.showDeleteModal(hand))
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
                    {`${hand.hand.key_name}(${hand.hand.role})`}
                </Typography>
                <Typography variant="caption">{hand.hand.description}</Typography>
            </Box>

            {checkStatickRole('update_hands') && (
                <Box width="100%" display="flex" gap={2} justifyContent="flex-end">
                    <Button color="error" startIcon={<DeleteIcon />} onClick={handleDeleteOpen}>
                        Удалить
                    </Button>
                </Box>
            )}
        </Box>
    )
}
