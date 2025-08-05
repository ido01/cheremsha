import { TaskAlt as TaskAltIcon } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { LabelText } from 'app/components/LabelText'
import React from 'react'
import { EStatus } from 'types'
import { IDocument } from 'types/IDocument'

interface DocumentNameRowProps {
    item: IDocument
}

export const DocumentBigNameRow: React.FC<DocumentNameRowProps> = ({ item }) => (
    <Box>
        <LabelText
            label="Название"
            node={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {item.task_status !== EStatus.FINISHED && (
                        <TaskAltIcon
                            sx={(theme) => ({
                                color:
                                    item.task_status === EStatus.ERROR
                                        ? theme.palette.error.main
                                        : item.task_status === EStatus.PENDING
                                        ? theme.palette.warning.main
                                        : item.task_status === EStatus.INITIAL
                                        ? theme.palette.primary.main
                                        : theme.palette.success.main,
                            })}
                        />
                    )}
                    {item.task_status === EStatus.FINISHED && (
                        <TaskAltIcon
                            sx={(theme) => ({
                                color: theme.palette.success.main,
                            })}
                        />
                    )}
                    <Typography variant="h5" color="grey.900" sx={{ ml: 1 }}>
                        {item.name}
                    </Typography>
                </Box>
            }
        />
    </Box>
)
