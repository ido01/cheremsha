import { Box, Typography } from '@mui/material'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import dayjs from 'dayjs'
import React from 'react'
import { IAction } from 'types/IAction'

interface Props {
    action: IAction
}

export const MobileActionView: React.FC<Props> = ({ action }) => {
    const user = action.user
    return (
        <Box px={2} py={1} width={'100%'}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-end'}>
                <Box display={'flex'} alignItems={'center'}>
                    <AvatarImage
                        name={`${user.last_name} ${user.name}`}
                        image={user.avatar?.thumb}
                        achieve={user.achieve}
                        size={36}
                    />

                    <Box ml={2}>
                        <Typography variant="body2">{`${user.last_name} ${user.name}`}</Typography>
                    </Box>
                </Box>

                <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
                    <Box display={'flex'} gap={2} alignItems={'center'}>
                        <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
                            <Typography variant="body1" color="grey.900">
                                {action.url}
                            </Typography>

                            <Typography variant="caption" color="grey.600">
                                {dayjs(action.createdAt).locale('ru').format('D MMM YYYY H:m')}
                            </Typography>
                        </Box>

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
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
