import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { Box, Button, Chip, Typography } from '@mui/material'
import React, { ReactNode, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IIssue, TCollapseKey } from 'types/IIssue'

import { priorities } from '../slice/constants'
import { selectIssueById } from '../slice/selectors'
import { idGenerate, urlGenerate } from '../slice/utils'

interface Props {
    open: boolean
    issue?: IIssue
    onCollapse: (value: TCollapseKey) => void
}

interface RowProps {
    label: string
    children: ReactNode
}

const Row: React.FC<RowProps> = ({ label, children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}
        >
            <Typography variant="caption" sx={{ width: '150px' }}>
                {label}
            </Typography>
            {children}
        </Box>
    )
}

export const TaskDetail: React.FC<Props> = ({ open, issue, onCollapse }) => {
    const history = useNavigate()

    const tags = useMemo(() => {
        if (!issue || !issue.tags) return []
        const tags = issue.tags.split(';').filter((tag) => !!tag)
        return Array.isArray(tags) ? tags : []
    }, [issue])

    const getIssue = useSelector(selectIssueById)
    const parent = getIssue(issue?.parent_id || '')

    const handleClick = () => {
        onCollapse('detail')
    }

    const handleLinkClick = () => {
        if (parent) {
            history(urlGenerate(parent))
        }
    }

    const handleTagClick = (tag: string) => {
        //
    }

    if (!issue) {
        return null
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    cursor: 'pointer',
                }}
                onClick={handleClick}
            >
                <Typography variant="caption">{issue.type === 'task' ? 'Детали задачи' : 'Детали доски'}</Typography>
                {open ? <KeyboardArrowDownIcon fontSize="small" /> : <KeyboardArrowRightIcon fontSize="small" />}
            </Box>
            <Box
                sx={{
                    maxHeight: open ? '1000vh' : '0px',
                    overflow: 'hidden',
                    transition: '0.1s',
                    p: open ? 1 : 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                {parent && (
                    <Row label="Родительская задача:">
                        <Button variant="text" onClick={handleLinkClick} sx={{ p: 0 }}>
                            {idGenerate(parent)}
                        </Button>
                    </Row>
                )}

                <Row label="Тип:">
                    <Typography variant="body3" fontWeight={600}>
                        {issue.type === 'folder' ? 'Доска' : 'Задача'}
                    </Typography>
                </Row>

                <Row label="Приоритет:">
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                        }}
                    >
                        <Box
                            sx={{
                                width: '12px',
                                height: '12px',
                                borderRadius: 1,
                                backgroundColor: priorities[issue.priority].color,
                            }}
                        ></Box>

                        {priorities[issue.priority].label}
                    </Box>
                </Row>

                {tags.length > 0 && (
                    <Row label="Метки:">
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            {tags.map((tag, index) => (
                                <Chip key={index} label={tag} onClick={() => handleTagClick(tag)} />
                            ))}
                        </Box>
                    </Row>
                )}
            </Box>
        </Box>
    )
}
