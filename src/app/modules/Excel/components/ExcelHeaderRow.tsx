import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { IExcel } from 'types/IExcel'

import { ExcelIcon } from './ExcelIcon'
import { PDFIcon } from './PDFIcon'
import { PowerPointIcon } from './PowerPointIcon'
import { WordIcon } from './WordIcon'

interface Props {
    item: IExcel
}

export const ExcelHeaderRow: React.FC<Props> = ({ item }) => {
    return (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box display={'flex'} alignItems={'center'}>
                {item.type === 'xls' && <ExcelIcon />}
                {item.type === 'xlsx' && <ExcelIcon />}
                {item.type === 'doc' && <WordIcon />}
                {item.type === 'docx' && <WordIcon />}
                {item.type === 'pdf' && <PDFIcon />}
                {item.type === 'ppt' && <PowerPointIcon />}
                {item.type === 'pptx' && <PowerPointIcon />}

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
