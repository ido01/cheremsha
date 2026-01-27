import { Delete as DeleteIcon } from '@mui/icons-material'
import { Box, Container, IconButton, Typography } from '@mui/material'
import { Modal } from 'app/components/Modal'
import Table from 'app/components/Table'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IHandUser } from 'types/IHand'
import { TTableRowData } from 'types/ITableDisplay'

import { DeleteUserModal } from '../components/DeleteUserModal'
import { handsActions } from '../slice'
import { selectHandById, selectUserList } from '../slice/selectors'
import { handUserActions } from '../user'
import { selectDeleteModal } from '../user/selectors'

export const HandUserListForm: React.FC = () => {
    const dispatch = useDispatch()

    const { users, open, activeId } = useSelector(selectUserList)
    const { open: openDelete } = useSelector(selectDeleteModal)

    const getHand = useSelector(selectHandById)
    const hand = getHand(activeId)

    const handleClose = () => {
        dispatch(handsActions.hideUserList())
    }

    useEffect(() => {
        if (activeId) {
            dispatch(handsActions.loadUsers(activeId))
        }
    }, [activeId, openDelete])

    const handleDeleteOpen = (hand: IHandUser) => {
        dispatch(handUserActions.showDeleteModal(hand))
    }

    const tableRows: TTableRowData[] = [
        {
            title: 'Пользователь',
            name: 'name',
            xs: 9,
            element: (hand: IHandUser) => (
                <>
                    <AvatarImage
                        name={`${hand.user?.last_name} ${hand.user?.name}`}
                        image={hand.user?.avatar?.thumb}
                        size={36}
                        achieve={hand.user?.achieve}
                    />

                    <Box ml={2}>
                        <Typography variant="body2">{`${hand.user?.last_name} ${hand.user?.name}`}</Typography>
                    </Box>
                </>
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
                    <IconButton color="error" aria-haspopup="true" onClick={() => handleDeleteOpen(hand)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ]

    return (
        <Modal
            open={open}
            title={hand ? `${hand.key_name}(${hand.role})` : 'Роль не найдена'}
            handleClose={handleClose}
        >
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        py: 11,
                    }}
                >
                    <Table
                        items={users}
                        rows={tableRows}
                        // handleClickRow={handleClickRow}
                    />
                    <DeleteUserModal />
                </Box>
            </Container>
        </Modal>
    )
}
