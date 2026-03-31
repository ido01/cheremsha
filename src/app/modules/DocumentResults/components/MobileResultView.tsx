import { Box, Typography } from '@mui/material'
import { TableEmptyRow } from 'app/components/Table'
import { selectLocation } from 'app/modules/Locations/slice/selectors'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React from 'react'
import { useSelector } from 'react-redux'
import { EState } from 'types'
import { IUser } from 'types/IUser'
import { convertDocumentResultState } from 'utils/convertUtils'

interface MobileUserViewProps {
    user: IUser
}

export const MobileResultView: React.FC<MobileUserViewProps> = ({ user }) => {
    const getLocation = useSelector(selectLocation)

    return (
        <Box px={2} py={1} width={'100%'}>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-end'}>
                <Box display={'flex'} alignItems={'center'}>
                    <AvatarImage
                        name={`${user.last_name} ${user.name}`}
                        image={user.avatar?.thumb}
                        achieve={user.achieve}
                    />

                    <Box ml={2}>
                        <Typography variant="body2">{`${user.last_name} ${user.name}`}</Typography>

                        <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                            <Typography mr={1} variant="caption" color="grey.600">
                                Точка
                            </Typography>

                            <>
                                {!!user.place_id && (
                                    <Typography variant="body2" color="grey.600">
                                        {getLocation(user.place_id)}
                                    </Typography>
                                )}

                                {!user.place_id && <TableEmptyRow />}
                            </>
                        </Box>
                    </Box>
                </Box>

                <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                    <Typography mr={1} variant="caption" color="grey.600">
                        Статус
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={(theme) => ({
                            color:
                                !user.document || user.document.state === EState.INITIAL
                                    ? theme.palette.error.main
                                    : user.document.state === EState.PENDING
                                    ? theme.palette.warning.main
                                    : user.document.state === EState.COMPLETED
                                    ? theme.palette.success.main
                                    : theme.palette.success.main,
                        })}
                    >
                        {convertDocumentResultState(user.document?.state || EState.INITIAL)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
