import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import { Box, Container, IconButton } from '@mui/material'
import { Main } from 'app/modules/Layout/templates/Main'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkSudoAccess } from 'utils/roles'

import { DeleteModal } from '../components/DeleteModal'
import { Folder } from '../components/Folder'
import { IssuesSettings } from '../components/IssuesSettings'
import { issuesActions } from '../slice'
import { selectIssuesFolder } from '../slice/selectors'
import { IssueForm } from './IssueForm'

export const IssuesList: React.FC = () => {
    const dispatch = useDispatch()

    const profileRole = useSelector(selectProfileRole)
    const getLists = useSelector(selectIssuesFolder)
    const checkStatickRole = useSelector(selectCheckAccess)
    const lists = getLists('0')
    const [open, setOpen] = useState<boolean>(false)

    const handleSettingOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        dispatch(issuesActions.loadIssues())
    }, [])

    return (
        <Main
            title={'Задачи'}
            searchDisabled
            endNode={
                checkStatickRole('update_board_issue') ? (
                    <IconButton
                        sx={{ bgcolor: '#FDFDFD90' }}
                        aria-label="more"
                        id="long-button"
                        aria-haspopup="true"
                        onClick={handleSettingOpen}
                    >
                        <MoreVertIcon />
                    </IconButton>
                ) : undefined
            }
        >
            <Box
                sx={{
                    pb: 11,
                }}
            >
                <Container>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        {lists.map((list) => (
                            <Folder key={list.id} issue={list} />
                        ))}
                    </Box>
                </Container>
            </Box>

            {checkStatickRole('update_board_issue') && <IssuesSettings open={open} handleClose={handleClose} />}
            <IssueForm />
            <DeleteModal />
        </Main>
    )
}
