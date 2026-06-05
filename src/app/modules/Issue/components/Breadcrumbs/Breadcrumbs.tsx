import { Box, Typography } from '@mui/material'
import React from 'react'
import { IBreadcrumb } from 'types/IIssue'

import { Breadcrumb } from './components/Breadcrumb'

interface Props {
    breadcrumbs: IBreadcrumb[]
}

export const Breadcrumbs: React.FC<Props> = ({ breadcrumbs }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                gap: 1,
                overflow: 'hidden',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}
        >
            {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={`${breadcrumb.id}_${index}`}>
                    {!!index && <Typography>/</Typography>}
                    <Breadcrumb text={!index} breadcrumb={breadcrumb} />
                </React.Fragment>
            ))}
        </Box>
    )
}
