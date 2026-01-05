import { Box, Typography } from '@mui/material'
import React from 'react'
import { IQuiz } from 'types/IQuiz'

import { QuizDateRow } from './QuizDateRow'
import { QuizNameRow } from './QuizNameRow'
import { QuizStatusRow } from './QuizStatusRow'

interface MobileQuizViewProps {
    item: IQuiz
}

export const MobileQuizView: React.FC<MobileQuizViewProps> = ({ item }) => (
    <Box px={2} width={'100%'}>
        <Box display={'flex'} alignItems={'center'}>
            <QuizNameRow item={item} />
        </Box>

        <Box mt={1} display={'flex'} justifyContent={'space-between'}>
            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                <QuizDateRow item={item} />
            </Box>

            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                <Typography mr={1} variant="caption" color="grey.600">
                    Статус
                </Typography>

                <QuizStatusRow item={item} />
            </Box>
        </Box>
    </Box>
)
