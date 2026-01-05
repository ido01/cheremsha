import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { EState } from 'types'
import { IDocument } from 'types/IDocument'

import { DocumentHeaderRow } from './DocumentHeaderRow'
import { DocumentStatusRow } from './DocumentStatusRow'

interface MobileDocumentViewProps {
    item: IDocument
}

export const MobileDocumentView: React.FC<MobileDocumentViewProps> = ({ item }) => (
    <Box px={2} pb={1} pt={1} width={'100%'}>
        <DocumentHeaderRow item={item} />

        <Box mt={2} display={'flex'} justifyContent={'space-between'}>
            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                <Typography variant="body3" color="grey.600">
                    {dayjs(item.createdAt).locale('ru').format('D MMM YYYY')}
                </Typography>
            </Box>

            {item.state.state === EState.INITIAL && (
                <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                    <Typography mr={1} variant="caption" color="grey.600">
                        Статус
                    </Typography>

                    <DocumentStatusRow item={item} />
                </Box>
            )}
        </Box>
    </Box>
)
