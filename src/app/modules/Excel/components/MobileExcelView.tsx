import { Box, Typography } from '@mui/material'
import React from 'react'
import { IExcel } from 'types/IExcel'

import { ExcelHeaderRow } from './ExcelHeaderRow'
import { ExcelSizeRow } from './ExcelSize'

interface Props {
    item: IExcel
}

export const MobileExcelView: React.FC<Props> = ({ item }) => (
    <Box px={2} pb={1} pt={1} width={'100%'}>
        <ExcelHeaderRow item={item} />
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
                    Размер
                </Typography>

                <ExcelSizeRow item={item} />
            </Box>
        </Box>
    </Box>
)
