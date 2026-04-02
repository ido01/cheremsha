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

export const DesctopActionGroupView: React.FC<Props> = ({ action }) => {
    const [open, setOpen] = useState(false)

    const handleClickRow = () => {
        setOpen((value) => !value)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '7fr 5fr',
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
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
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
                            {dayjs(action.createdAt).locale('ru').format('D MMM YYYY')}
                        </Typography>
                    </Box>

                    <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'} gap={2}>
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
                            Событий: {action.actions?.length}
                        </Typography>

                        <IconButton color="info" onClick={handleClickRow} sx={{ bgcolor: '#66666611' }}>
                            <KeyboardArrowDownIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            {open && action.actions && <TableAction actions={action.actions} />}
        </Box>
    )
}
