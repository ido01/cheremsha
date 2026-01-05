import { Assignment as AssignmentIcon } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { IDocument } from 'types/IDocument'

interface DocumentHeaderRowProps {
    item: IDocument
}

export const DocumentHeaderRow: React.FC<DocumentHeaderRowProps> = ({ item }) => {
    return (
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box display={'flex'} alignItems={'center'}>
                <Typography variant="h6" sx={{ fontSize: 20 }}>
                    <AssignmentIcon
                        sx={(theme) => ({
                            color: theme.palette.success.main,
                            float: 'left',
                            mr: 1,
                        })}
                    />
                    {item.name}
                </Typography>
            </Box>
        </Box>
    )
}
