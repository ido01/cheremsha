import { Box, Typography } from '@mui/material'
import { TableEmptyRow } from 'app/components/Table'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React from 'react'
import { IUser } from 'types/IUser'
import { convertPlaceName } from 'utils/convertUtils'

interface MobileUserViewProps {
    user: IUser
}

export const MobileUserView: React.FC<MobileUserViewProps> = ({ user }) => {
    return (
        <Box px={2} pt={2} width={'100%'}>
            <Box>
                <Box display={'flex'}>
                    <AvatarImage name={`${user.last_name} ${user.name}`} image={user.avatar?.url} />

                    <Box ml={2}>
                        <Typography variant="body2">{`${user.last_name} ${user.name}`}</Typography>
                    </Box>
                </Box>
            </Box>

            <Box mt={2} display={'flex'} justifyContent={'space-between'}>
                <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                    <Typography mr={1} variant="caption" color="grey.600">
                        Точка
                    </Typography>

                    <>
                        {!!user.place_id && (
                            <Typography variant="body2" color="grey.600">
                                {convertPlaceName(user.place_id)}
                            </Typography>
                        )}

                        {!user.place_id && <TableEmptyRow />}
                    </>
                </Box>
                <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                    <Typography mr={1} variant="caption" color="grey.600">
                        Статус
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={(theme) => ({
                            color: user.blocked
                                ? theme.palette.error.main
                                : !user.active
                                ? theme.palette.success.main
                                : theme.palette.warning.main,
                        })}
                    >
                        {user.blocked ? 'Заблокирован' : !user.active ? 'Новый' : 'Действующий'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
