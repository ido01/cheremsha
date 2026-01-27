import { Box, Container } from '@mui/material'
import { BreadcrumbItem } from 'app/components/Breadcrumbs'
import { Main } from 'app/modules/Layout/templates/Main'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { DeleteModal } from '../components/DeleteModal'
import { ExecutorModal } from '../components/ExecutorModal'
import { IssueBody } from '../components/IssueBody'
import { StatusText } from '../components/StatusText'
import { selectIssueById } from '../slice/selectors'
import { getId } from '../slice/utils'
import { IssueFolderForm } from './IssueFolderForm'

export const IssuesFolderList: React.FC = () => {
    const { id: fullId } = useParams<{ id?: string }>()
    const id = getId(fullId || '')

    const getIssue = useSelector(selectIssueById)
    const issue = getIssue(id || '')

    const breadcrumbsItems: BreadcrumbItem[] = [
        {
            text: 'Задачи',
            link: '/issues',
        },
        {
            text: '',
        },
    ]

    const breadcrumbsItemsMobile: BreadcrumbItem = {
        text: 'Задачи',
        link: '/issues',
    }

    return (
        <Main
            title={issue?.title || 'Задачи'}
            searchDisabled
            breadcrumbs={breadcrumbsItems}
            breadcrumbsItemsMobile={breadcrumbsItemsMobile}
            endNode={
                issue?.type === 'task' && (
                    <Box sx={{ pr: 2 }}>
                        <StatusText status={issue.status} />
                    </Box>
                )
            }
        >
            <Box
                sx={{
                    pb: 11,
                }}
            >
                <Container>
                    <IssueBody id={id} main isInit open issue={issue} />
                </Container>
            </Box>

            <IssueFolderForm />
            <DeleteModal />
            <ExecutorModal />
        </Main>
    )
}
