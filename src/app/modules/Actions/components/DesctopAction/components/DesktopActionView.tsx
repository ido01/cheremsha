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

export const DesktopActionView: React.FC<Props> = ({ action, disabledUser }) => {
    const dispatch = useDispatch()

    const handleClickRow = () => {
        dispatch(usersActions.userLoaded(action.user))
        dispatch(usersActions.setActiveId(action.uid))
        dispatch(usersActions.showModal())
    }

    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '7fr 5fr',
                gap: 2,
            }}
            onClick={handleClickRow}
        >
            <Box display={'flex'} gap={2} alignItems={'center'} sx={{ overflow: 'hidden' }}>
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
            </Box>

            <Box display={'flex'} justifyContent={disabledUser ? 'flex-end' : 'space-between'} alignItems={'center'}>
                <Box sx={{ overflow: 'hidden' }}>
                    <Typography
                        variant="body2"
                        color="grey.600"
                        sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            width: '100%',
                        }}
                    >
                        {dayjs(action.createdAt).locale('ru').format('D MMM YYYY H:mm')}
                    </Typography>
                </Box>

                {!disabledUser && (
                    <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                        <Box mr={2}>
                            <Typography variant="body2">{`${action.user.last_name} ${action.user.name}`}</Typography>
                        </Box>

                        <AvatarImage
                            name={`${action.user.last_name} ${action.user.name}`}
                            image={action.user.avatar?.thumb}
                            size={36}
                            achieve={action.user.achieve}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    )
}
