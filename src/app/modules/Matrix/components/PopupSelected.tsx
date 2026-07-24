import { Add as AddIcon, Close as CloseIcon, Remove as RemoveIcon } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNoun } from 'utils/getNoun'

import { matrixActions } from '../slice'

interface PopupSelectedProps {
    id: string
    selected: string[]
    onClose: () => void
}

export const PopupSelected: React.FC<PopupSelectedProps> = ({ id, selected, onClose }) => {
    const dispatch = useDispatch()

    const checkStatickRole = useSelector(selectCheckAccess)

    const handleEmpty = () => {
        dispatch(
            matrixActions.emptyMany({
                parent_id: id,
                ids: selected,
            })
        )
        onClose()
    }

    const handleStock = () => {
        dispatch(
            matrixActions.stockMany({
                parent_id: id,
                ids: selected,
            })
        )
        onClose()
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: selected.length > 0 ? 0 : -100,
                left: 0,
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                pb: '32px',
                zIndex: 9999,
                transition: '.5s',
            }}
        >
            <Box
                sx={{
                    border: '2px solid #75757590',
                    backgroundColor: '#ffffff',
                    borderRadius: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 1,
                    px: 1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    {checkStatickRole('stock_matrix') && (
                        <IconButton color="success" onClick={handleStock}>
                            <AddIcon />
                        </IconButton>
                    )}

                    <IconButton color="error" onClick={handleEmpty}>
                        <RemoveIcon />
                    </IconButton>
                </Box>

                <Typography>{`${selected.length} ${getNoun(
                    selected.length,
                    'элемент',
                    'элемента',
                    'элементов'
                )}`}</Typography>
                <IconButton sx={{ bgcolor: '#FDFDFD90' }} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
        </Box>
    )
}
