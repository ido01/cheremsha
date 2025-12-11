import { Box, Typography } from '@mui/material'
import Table from 'app/components/Table'
import React from 'react'
import { TTableRowData } from 'types/ITableDisplay'

interface AccessListProps {
    access: string[]
    uid: string
}

export const AccessList: React.FC<AccessListProps> = ({ access }) => {
    const tableRows: TTableRowData[] = [
        {
            title: 'Роль',
            name: 'access',
            xs: 12,
            element: (access_key: string) => <Typography variant="body2">{access_key}</Typography>,
        },
    ]

    return (
        <Box pt={4}>
            <Table disablePadding items={access} rows={tableRows} />
        </Box>
    )
}
