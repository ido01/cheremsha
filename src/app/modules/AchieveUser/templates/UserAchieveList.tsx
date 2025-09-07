import { Delete as DeleteIcon } from '@mui/icons-material'
import * as Icons from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import Table from 'app/components/Table'
import { achieveActions } from 'app/modules/Achieve/slice'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IAchieve } from 'types/IAchieve'
import { TTableRowData } from 'types/ITableDisplay'
import { checkAdminAccess } from 'utils/roles'

import { DeleteModal } from '../components/DeleteModal'
import { FormModal } from '../components/FormModal'
import { MobileView } from '../components/MobileView'
import { achieveUserActions } from '../slice'
import { selectAchieve, selectStatus } from '../slice/selectors'

interface UserAchieveListProps {
    id: string
}

export const UserAchieveList: React.FC<UserAchieveListProps> = ({ id }) => {
    const dispatch = useDispatch()

    const profileRole = useSelector(selectProfileRole)
    const status = useSelector(selectStatus)
    const achieves = useSelector(selectAchieve)

    const handleDeleteOpen = (achive: IAchieve) => {
        dispatch(achieveUserActions.showDeleteModal(achive))
    }

    useEffect(() => {
        dispatch(achieveActions.loadAchieve())
        dispatch(achieveUserActions.cleanachieve())
        dispatch(achieveUserActions.loadAchieve(id))
    }, [])

    const tableRows: TTableRowData[] = [
        {
            title: '',
            name: 'name',
            xs: 9,
            element: (achieve: IAchieve) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const Icon = Icons[achieve.icon]
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
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
                        <Typography variant="body1" fontWeight={600}>
                            {achieve.label}
                        </Typography>

                        <Typography variant="body3" color="grey.700">
                            {achieve.user?.description || achieve.description}
                        </Typography>
                    </Box>
                )
            },
        },
        {
            title: '',
            name: 'offices',
            xs: 3,
            element: (achieve: IAchieve) => (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                    }}
                >
                    {checkAdminAccess(profileRole) && (
                        <IconButton color="error" aria-haspopup="true" onClick={() => handleDeleteOpen(achieve)}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Box>
            ),
        },
    ]

    const mobileView = (achieve: IAchieve) => <MobileView achieve={achieve} />

    return (
        <Box
            sx={{
                px: 1,
            }}
        >
            <Table
                items={achieves}
                rows={tableRows}
                isLoading={status === EStatus.PENDING}
                nocolumn
                isMobile
                noPadding
                mobileView={mobileView}
                // handleClickRow={handleClickRow}
            />

            {checkAdminAccess(profileRole) && (
                <>
                    <DeleteModal />
                    <FormModal />
                </>
            )}
        </Box>
    )
}
