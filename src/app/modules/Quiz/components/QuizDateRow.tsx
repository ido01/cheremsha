import { Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { IQuiz } from 'types/IQuiz'

interface QuizDateRowProps {
    item: IQuiz
}

export const QuizDateRow: React.FC<QuizDateRowProps> = ({ item }) => (
    <Typography variant="body2" color="grey.600">
        {dayjs(item.createdAt).locale('ru').format('D MMM YYYY')}
    </Typography>
)
