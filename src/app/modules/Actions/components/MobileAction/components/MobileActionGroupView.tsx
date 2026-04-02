import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, IconButton, Typography } from '@mui/material'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { IAction } from 'types/IAction'

import { TableAction } from '../../TableAction'

interface Props {
    action: IAction
}

export const MobileActionGroupView: React.FC<Props> = ({ action }) => {
    const [open, setOpen] = useState(false)

    const handleClickRow = () => {
        setOpen((value) => !value)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                <Box display={'flex'} alignItems={'center'}>
                    <AvatarImage
                        name={`${action.user.last_name} ${action.user.name}`}
                        image={action.user.avatar?.thumb}
                        size={36}
                        achieve={action.user.achieve}
                    />
                    <Box ml={2}>
                        <Typography variant="body2">{`${action.user.last_name} ${action.user.name}`}</Typography>
                    </Box>
                </Box>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        alignContent={'flex-end'}
                        justifyContent={'flex-end'}
                    >
                        <Typography
                            variant="body3"
                            color="grey.600"
                            sx={{
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                width: '100%',
                            }}
                        >
                            Событий: {action.actions?.length}
                        </Typography>

                        <Box sx={{ overflow: 'hidden' }}>
                            <Typography
                                variant="caption"
                                color="grey.600"
                                sx={{
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    width: '100%',
                                }}
                            >
                                {dayjs(action.createdAt).locale('ru').format('D MMM YYYY')}
                            </Typography>
                        </Box>
                    </Box>

                    <IconButton color="info" onClick={handleClickRow} sx={{ bgcolor: '#66666611' }}>
                        <KeyboardArrowDownIcon />
                    </IconButton>
                </Box>
            </Box>

            {open && action.actions && <TableAction actions={action.actions} />}
        </Box>
    )
}
