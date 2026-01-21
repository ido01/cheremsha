import { Delete as DeleteIcon } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'
import Table from 'app/components/Table'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IHandUser } from 'types/IHand'
import { TTableRowData } from 'types/ITableDisplay'
import { IUser } from 'types/IUser'

import { DeleteUserModal } from '../components/DeleteUserModal'
import { MobileUserView } from '../components/MobileUserView'
import { handUserActions } from '../user'
import { initHand } from '../user/constants'
import { selectHandUsers } from '../user/selectors'
import { HandUserForm } from './HandUserForm'

interface Props {
    user: IUser
}

export const UserList: React.FC<Props> = ({ user }) => {
    const dispatch = useDispatch()

    const getHands = useSelector(selectHandUsers)
    const hands = getHands(user.id)
    const checkStatickRole = useSelector(selectCheckAccess)

    useEffect(() => {
        dispatch(handUserActions.cleanHands())
        dispatch(handUserActions.loadHands(user.id))
    }, [user])

    const handleDeleteOpen = (hand: IHandUser) => {
        dispatch(handUserActions.showDeleteModal(hand))
    }

    const handleAdd = () => {
        dispatch(
            handUserActions.openEditModal({
                ...initHand,
                uid: user.id,
            })
        )
    }

    const tableRows: TTableRowData[] = [
        {
            title: 'Роль',
            name: 'name',
            xs: 9,
            element: (hand: IHandUser) => (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0,
                        pl: 1,
                    }}
                >
                    <Typography variant="body2" fontWeight={600}>
                        {`${hand.hand.key_name}(${hand.hand.role})`}
                    </Typography>
                    <Typography variant="caption">{hand.hand.description}</Typography>
                </Box>
            ),
        },
        {
            title: '',
            name: 'offices',
            xs: 3,
            element: (hand: IHandUser) => (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                    }}
                >
                    {checkStatickRole('update_hands') && (
                        <IconButton color="error" aria-haspopup="true" onClick={() => handleDeleteOpen(hand)}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            ),
        },
    ]

    const mobileView = (hand: IHandUser) => <MobileUserView hand={hand} />

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="caption">{hands.length === 0 ? 'Нет назначенных ролей' : ''}</Typography>
                <Box>
                    <Button
                        size="small"
                        variant="contained"
                        color="success"
                        sx={{ whiteSpace: 'nowrap' }}
                        onClick={handleAdd}
                    >
                        Добавить роль
                    </Button>
                </Box>
            </Box>
            <Table
                items={hands}
                rows={tableRows}
                isLoading={status === EStatus.PENDING}
                mobileView={mobileView}
                // handleClickRow={handleClickRow}
            />

            <HandUserForm />
            <DeleteUserModal />
        </Box>
    )
}
