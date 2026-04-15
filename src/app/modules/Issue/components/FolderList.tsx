import { Box, Button, Typography } from '@mui/material'
import { LinearProgress } from 'app/components/LinearProgress'
import { selectProfile } from 'app/modules/Profile/slice/selectors'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TIssueStatus } from 'types/IIssue'

import { issuesActions } from '../slice'
import { issueInit } from '../slice/constants'
import { selectIssueById, selectIssuesFolder } from '../slice/selectors'
import { issueRoleCheck } from '../slice/utils'
import { Issue } from './Issue'

interface Props {
    id: string
}

export const FolderList: React.FC<Props> = ({ id }) => {
    const dispatch = useDispatch()
    const profile = useSelector(selectProfile)
    const getCat = useSelector(selectIssueById)
    const cat = getCat(id || '')
    const getLists = useSelector(selectIssuesFolder)
    const lists = getLists(id || '')

    const status = useMemo(() => {
        return lists.reduce<{ [key in TIssueStatus]: number }>(
            (acc, item) => {
                if (!acc[item.status]) {
                    acc[item.status] = 1
                } else {
                    acc[item.status]++
                }
                return acc
            },
            {
                open: 0,
                progress: 0,
                review: 0,
                done: 0,
                error: 0,
                closed: 0,
                deleted: 0,
            }
        )
    }, [lists])

    const handleAdd = () => {
        dispatch(
            issuesActions.openEditModal({
                ...issueInit,
                parent_id: id || '0',
                type: 'task',
                ...(cat && {
                    access_update_id: cat.access_update_id,
                    access_update: cat.access_update,
                    access_view_id: cat.access_view_id,
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
                    <LinearProgress {...status} />
                ) : (
                    <Typography variant="caption">Нет задач</Typography>
                )}

                <Box>
                    {cat && issueRoleCheck(profile, cat.access_update, cat) && (
                        <Button
                            size="small"
                            variant="contained"
                            color="success"
                            sx={{ whiteSpace: 'nowrap' }}
                            onClick={handleAdd}
                        >
                            Добавить задачу
                        </Button>
                    )}
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
