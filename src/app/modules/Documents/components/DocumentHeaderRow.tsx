import { Assignment as AssignmentIcon } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { IDocument } from 'types/IDocument'

interface DocumentHeaderRowProps {
    item: IDocument
}

export const DocumentHeaderRow: React.FC<DocumentHeaderRowProps> = ({ item }) => {
    return (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box display={'flex'} alignItems={'center'}>
                <AssignmentIcon
                    sx={(theme) => ({
                        color: theme.palette.grey[600],
                        float: 'left',
                    })}
                />

                <Typography ml={1} variant="caption" color="grey.600">
                    Название
                </Typography>
            </Box>

            <Typography ml={1} variant="body3" color="grey.600">
                {dayjs(item.createdAt).locale('ru').format('D MMM YYYY')}
            </Typography>
        </Box>
    )
}
