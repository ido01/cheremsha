import { Button, Typography } from '@mui/material'
import { idGenerate, urlGenerate } from 'app/modules/Issue/slice/utils'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IBreadcrumb } from 'types/IIssue'

interface Props {
    breadcrumb: IBreadcrumb
    text: boolean
}

export const Breadcrumb: React.FC<Props> = ({ breadcrumb, text }) => {
    const history = useNavigate()

    const handleLinkClick = () => {
        history(urlGenerate(breadcrumb))
    }

    if (text) {
        return (
            <Typography
                color="grey.500"
                variant="caption"
                sx={{ p: 0, whiteSpace: 'nowrap', flexShrink: 0 }}
            >{`[${idGenerate(breadcrumb)}] ${breadcrumb.title}`}</Typography>
        )
    }

    return (
        <Button variant="text" onClick={handleLinkClick} sx={{ p: 0, whiteSpace: 'nowrap', flexShrink: 0 }}>
            {`[${idGenerate(breadcrumb)}] ${breadcrumb.title}`}
        </Button>
    )
}
