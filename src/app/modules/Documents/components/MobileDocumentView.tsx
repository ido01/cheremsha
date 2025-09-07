import { Box, Typography } from '@mui/material'
import React from 'react'
import { IDocument } from 'types/IDocument'

import { DocumentHeaderRow } from './DocumentHeaderRow'
import { DocumentStatusRow } from './DocumentStatusRow'

interface MobileDocumentViewProps {
    item: IDocument
}

export const MobileDocumentView: React.FC<MobileDocumentViewProps> = ({ item }) => (
    <Box px={2} pb={1} pt={1} width={'100%'}>
        <DocumentHeaderRow item={item} />
        <Box mt={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box>
                <Box display={'flex'}>
                    <Typography variant="h6" sx={{ fontSize: 20 }}>
                        {item.name}
                    </Typography>
                </Box>
            </Box>
        </Box>

        <Box display={'flex'} justifyContent={'flex-end'}>
            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                <Typography mr={1} variant="caption" color="grey.600">
                    Статус
                </Typography>

                <DocumentStatusRow item={item} />
            </Box>
        </Box>
    </Box>
)
