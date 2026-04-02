import { Box, Typography } from '@mui/material'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { usersActions } from 'app/modules/Users/slice'
import dayjs from 'dayjs'
import React from 'react'
import { useDispatch } from 'react-redux'
import { IAction } from 'types/IAction'

interface Props {
    action: IAction
    disabledUser?: boolean
}

export const MobileActionView: React.FC<Props> = ({ action, disabledUser }) => {
    const user = action.user
    const dispatch = useDispatch()

    const handleClickRow = () => {
        dispatch(usersActions.userLoaded(action.user))
        dispatch(usersActions.setActiveId(action.uid))
        dispatch(usersActions.showModal())
    }
    return (
        <Box px={2} py={1} width={'100%'} onClick={handleClickRow}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            px: 1,
                            py: 0.5,
                            borderRadius: 8,
                            backgroundColor:
                                action.method === 'PATCH'
                                    ? '#FFCC80'
                                    : action.method === 'DELETE'
                                    ? '#FF8A65'
                                    : action.method === 'GET'
                                    ? '#A5D6A7'
                                    : action.method === 'POST'
                                    ? '#4FC3F7'
                                    : '#B0BEC5',
                            color:
                                action.method === 'PATCH'
                                    ? '#E65100'
                                    : action.method === 'DELETE'
                                    ? '#BF360C'
                                    : action.method === 'GET'
                                    ? '#1B5E20'
                                    : action.method === 'POST'
                                    ? '#01579B'
                                    : '#263238',
                            borderBottom: `2px solid ${
                                action.method === 'PATCH'
                                    ? '#E65100'
                                    : action.method === 'DELETE'
                                    ? '#BF360C'
                                    : action.method === 'GET'
                                    ? '#1B5E20'
                                    : action.method === 'POST'
                                    ? '#01579B'
                                    : '#263238'
                            }`,
                            fontSize: '14px',
                            fontWeight: 600,
                        }}
                    >
                        {action.method}
                    </Box>

                    <Box display={'flex'} flexDirection={'column'} sx={{ overflow: 'hidden' }}>
                        <Typography
                            variant="body1"
                            color="grey.900"
                            sx={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                width: '100%',
                            }}
                        >
                            {action.url}
                        </Typography>

                        <Typography variant="caption" color="grey.600">
                            {dayjs(action.createdAt).locale('ru').format('D MMM YYYY H:mm')}
                        </Typography>
                    </Box>
                </Box>

                {!disabledUser && (
                    <Box
                        sx={{
                            flexShrink: 0,
                        }}
                    >
                        <AvatarImage
                            name={`${user.last_name} ${user.name}`}
                            image={user.avatar?.thumb}
                            achieve={user.achieve}
                            size={36}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    )
}
