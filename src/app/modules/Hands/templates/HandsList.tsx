import { Delete as DeleteIcon, Edit as EditIcon, MoreVert as MoreVertIcon } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import Table from 'app/components/Table'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IHand } from 'types/IHand'
import { TTableRowData } from 'types/ITableDisplay'

import { DeleteModal } from '../components/DeleteModal'
import { HandForm } from '../components/HandForm'
import { MobileView } from '../components/MobileView'
import { handsActions } from '../slice'
import { selectHands, selectStatus } from '../slice/selectors'
import { Settings } from './Settings'

export const HandsList: React.FC = () => {
    const dispatch = useDispatch()

    const [open, setOpen] = useState<boolean>(false)

    const status = useSelector(selectStatus)
    const hands = useSelector(selectHands)
    const checkStatickRole = useSelector(selectCheckAccess)

    const handleSettingOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDeleteOpen = (hand: IHand) => {
        dispatch(handsActions.showDeleteModal(hand))
    }

    const handleUpdateOpen = (hand: IHand) => {
        dispatch(handsActions.openEditModal(hand))
    }

    const tableRows: TTableRowData[] = [
        {
            title: 'Роль',
            name: 'name',
            xs: 9,
            element: (hand: IHand) => (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0,
                        pl: 1,
                    }}
                >
                    <Typography variant="body2" fontWeight={600}>
                        {`${hand.key_name}(${hand.role})`}
                    </Typography>
                    <Typography variant="caption">{hand.description}</Typography>
                </Box>
            ),
        },
        {
            title: '',
            name: 'offices',
            xs: 3,
            element: (hand: IHand) => (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                    }}
                >
                    {checkStatickRole('update_hands') && (
                        <>
                            <IconButton color="info" aria-haspopup="true" onClick={() => handleUpdateOpen(hand)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="error" aria-haspopup="true" onClick={() => handleDeleteOpen(hand)}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    )}
                </Box>
            ),
        },
    ]

    const mobileView = (hand: IHand) => <MobileView hand={hand} />

    useEffect(() => {
        dispatch(handsActions.loadHands())
    }, [])

    if (!checkStatickRole('show_hands')) {
        return null
    }

    return (
        <Main
            title={'Роли'}
            count={hands.length}
            searchDisabled
            endNode={
                checkStatickRole('update_hands') ? (
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
                items={hands}
                rows={tableRows}
                isLoading={status === EStatus.PENDING}
                mobileView={mobileView}
                // handleClickRow={handleClickRow}
            />

            {checkStatickRole('update_hands') && (
                <>
                    <Settings open={open} handleClose={handleClose} />
                    <DeleteModal />
                    <HandForm />
                </>
            )}
        </Main>
    )
}
