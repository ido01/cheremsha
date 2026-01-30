import { Typography } from '@mui/material'
import React from 'react'
import { IExcel } from 'types/IExcel'

import { ExcelIcon } from './ExcelIcon'
import { PDFIcon } from './PDFIcon'
import { PowerPointIcon } from './PowerPointIcon'
import { WordIcon } from './WordIcon'

interface ExcelNameRowProps {
    item: IExcel
}

export const ExcelNameRow: React.FC<ExcelNameRowProps> = ({ item }) => (
    <>
        {item.type === 'xls' && <ExcelIcon />}
        {item.type === 'xlsx' && <ExcelIcon />}
        {item.type === 'doc' && <WordIcon />}
        {item.type === 'docx' && <WordIcon />}
        {item.type === 'pdf' && <PDFIcon />}
        {item.type === 'ppt' && <PowerPointIcon />}
        {item.type === 'pptx' && <PowerPointIcon />}

        <Typography ml={1} variant="body2">
            {item.name}
        </Typography>
    </>
)
