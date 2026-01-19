import { Box, Button, Typography } from '@mui/material'
import { LinearProgress } from 'app/components/LinearProgress'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { issuesActions } from '../slice'
import { issueInit } from '../slice/constants'
import { selectIssueById, selectIssuesFolder } from '../slice/selectors'
import { Issue } from './Issue'

interface Props {
    id: string
}

export const FolderList: React.FC<Props> = ({ id }) => {
    const dispatch = useDispatch()
    const getCat = useSelector(selectIssueById)
    const cat = getCat(id || '')
    const getLists = useSelector(selectIssuesFolder)
    const lists = getLists(id || '')

    const handleAdd = () => {
        dispatch(
            issuesActions.openEditModal({
                ...issueInit,
                parent_id: id || '0',
                type: 'task',
                ...(cat && {
                    access_update: cat.access_update,
                    access_view: cat.access_view,
                    grade_name: cat.grade_name,
                }),
            })
        )
    }

    useEffect(() => {
        dispatch(issuesActions.loadFolder(id))
    }, [id])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                {lists.length > 0 ? (
                    <LinearProgress success={20} error={5} progress={50} />
                ) : (
                    <Typography variant="caption">Нет задач</Typography>
                )}

                <Box>
                    <Button
                        size="small"
                        variant="contained"
                        color="success"
                        sx={{ whiteSpace: 'nowrap' }}
                        onClick={handleAdd}
                    >
                        Добавить задачу
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {lists.map((list) => (
                    <Issue key={list.id} issue={list} />
                ))}
            </Box>
        </Box>
    )
}
