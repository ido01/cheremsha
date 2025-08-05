import { Typography } from '@mui/material'
import { selectProfile } from 'app/modules/Profile/slice/selectors'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IDocument } from 'types/IDocument'

interface DocumentStatusRowProps {
    item: IDocument
}

export const DocumentTaskUserStatus: React.FC<DocumentStatusRowProps> = ({ item }) => {
    const profile = useSelector(selectProfile)
    const taskState = item.users.find((state) => state.user_id === profile.id)

    const text = useMemo(() => {
        if (!taskState) return 'Не назначен'
        switch (taskState.status) {
            case EStatus.ERROR:
                return 'Переоткрыта'
            case EStatus.FINISHED:
                return 'Выполнена'
            case EStatus.INITIAL:
                return 'Новая'
            case EStatus.PENDING:
                return 'В работе'
        }
    }, [taskState])
    return (
        <Typography
            variant="body2"
            sx={(theme) => ({
                color:
                    taskState?.status === EStatus.ERROR
                        ? theme.palette.error.main
                        : taskState?.status === EStatus.PENDING
                        ? theme.palette.warning.main
                        : taskState?.status === EStatus.FINISHED
                        ? theme.palette.success.main
                        : taskState?.status === EStatus.INITIAL
                        ? theme.palette.primary.main
                        : theme.palette.grey[600],
            })}
        >
            {text}
        </Typography>
    )
}
