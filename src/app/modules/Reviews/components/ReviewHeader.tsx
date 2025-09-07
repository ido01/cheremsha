import { EmojiObjects as EmojiObjectsIcon, ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import React from 'react'
import { EState } from 'types'
import { IReview } from 'types/IReview'

export const getStatusLabel = (status: EState) => {
    switch (status) {
        case EState.INITIAL:
            return 'Валидация'
        case EState.OPEN:
            return 'Открыта'
        case EState.PENDING:
            return 'В работе'
        case EState.COMPLETED:
            return 'Выполнена'
        case EState.REJECTED:
            return 'Отклонено'
        case EState.CLOSED:
            return 'Закрыта'
    }
}

const getColor = (status: EState) => {
    switch (status) {
        case EState.INITIAL:
            return {
                color: '#e65100',
                backgroundColor: '#fff3e0',
                border: '1px solid #ff9800',
            }
        case EState.OPEN:
            return {
                color: '#827717',
                backgroundColor: '#f9fbe7',
                border: '1px solid #d4e157',
            }
        case EState.PENDING:
            return {
                color: '#1b5e20',
                backgroundColor: '#e8f5e9',
                border: '1px solid #66bb6a',
            }
        case EState.COMPLETED:
            return {
                color: '#0d47a1',
                backgroundColor: '#e3f2fd',
                border: '1px solid #2196f3',
            }
        case EState.REJECTED:
            return {
                color: '#b71c1c',
                backgroundColor: '#ffebee',
                border: '1px solid #ef5350',
            }
        case EState.CLOSED:
            return {
                color: '#b71c1c',
                backgroundColor: '#e3f2fd',
                border: '1px solid #2196f3',
            }
    }
}

interface ReviewHeaderProps {
    review: IReview
}

export const ReviewHeader: React.FC<ReviewHeaderProps> = ({ review }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                }}
            >
                {review.type === 'error' ? <ErrorOutlineIcon color="warning" /> : <EmojiObjectsIcon color="success" />}

                {review.user ? (
                    <AvatarImage
                        name={`${review.user.last_name} ${review.user.name}`}
                        image={review.user.avatar?.thumb}
                        size={42}
                        achieve={review.user.achieve}
                    />
                ) : (
                    <AvatarImage name={`Аноним`} size={42} />
                )}

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0,
                    }}
                >
                    {review.user ? (
                        <Typography
                            variant="body3"
                            fontWeight={600}
                        >{`${review.user.last_name} ${review.user.name}`}</Typography>
                    ) : (
                        <Typography variant="body3" fontWeight={600}>{`Аноним`}</Typography>
                    )}
                    <Typography variant="body1" color="grey.900">
                        {review.title}
                    </Typography>
                </Box>
            </Box>

            <Box
                sx={{
                    p: 1,
                    px: 2,
                    borderRadius: 8,
                    mr: 2,
                    ...getColor(review.status),
                }}
            >
                {getStatusLabel(review.status)}
            </Box>
        </Box>
    )
}
