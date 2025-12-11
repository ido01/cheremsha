import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EQuestionType, IQuestion } from 'types/IQuestion'
import { ISortValue, IVariantValue } from 'types/IQuiz'

import { quizActions } from '../slice'
import { selectQuestionLoading } from '../slice/selectors'

interface QuestionProps {
    expanded: number
    index: number
    qid: string
    question: IQuestion
}

export const Question: React.FC<QuestionProps> = ({ expanded, index, qid, question }) => {
    const dispatch = useDispatch()

    const isLoading = useSelector(selectQuestionLoading)

    const [value, setValue] = useState<string>(question.state?.vid || '')
    const [variantValue, setVariantValue] = useState<IVariantValue>({})
    const [sortValue, setSortValue] = useState<ISortValue>({})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value)
    }

    const handleVariantChange = (event: React.ChangeEvent<HTMLInputElement>, variant_id: string) => {
        setVariantValue((val) => ({
            ...val,
            [variant_id]: event.target.checked,
            length: true,
        }))
    }

    const handleSortChange = (event: SelectChangeEvent, variant_id: string) => {
        setSortValue((val) => ({
            ...val,
            [variant_id]: event.target.value as string,
            length: 'any',
        }))
    }

    const handleAnswer = () => {
        if (question.type === EQuestionType.VARIANT) {
            const variants = []
            for (const [key, value] of Object.entries(variantValue)) {
                if (value && key !== 'length') {
                    variants.push(key)
                }
            }
            dispatch(quizActions.question({ id: qid, qid: question.id, variants }))
        } else if (question.type === EQuestionType.TEXT) {
            dispatch(quizActions.question({ id: qid, qid: question.id, answer: value }))
        } else if (question.type === EQuestionType.SORT) {
            dispatch(quizActions.question({ id: qid, qid: question.id, sortValue }))
        }
    }

    return (
        <Accordion expanded={expanded === index} sx={{ flexGrow: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    Вопрос {index + 1} {question.state ? '✓' : ''}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="body1">{question.text}</Typography>

                <Divider sx={{ mt: 1, mb: 2 }} />

                {question.type === EQuestionType.VARIANT && (
                    <FormGroup sx={{ width: '100%' }}>
                        {question.variants.map((variant) => (
                            <FormControlLabel
                                key={variant.id}
                                control={
                                    <Checkbox
                                        checked={variantValue[variant.id] || false}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                            handleVariantChange(event, variant.id)
                                        }
                                    />
                                }
                                label={variant.text}
                            />
                        ))}
                    </FormGroup>
                )}

                {question.type === EQuestionType.TEXT && (
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Ответ"
                        value={value}
                        onChange={handleChange}
                        multiline
                        maxRows={4}
                    />
                )}

                {question.type === EQuestionType.SORT && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {question.first_variants?.map((variant) => (
                            <React.Fragment key={variant.id}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ width: '50%' }}>{variant.text}</Typography>

                                    <FormControl sx={{ width: '50%' }}>
                                        <InputLabel>Ответ</InputLabel>
                                        <Select
                                            fullWidth
                                            value={sortValue[variant.id] || ''}
                                            onChange={(event: SelectChangeEvent) => handleSortChange(event, variant.id)}
                                        >
                                            {question.second_variants?.map((item) => (
                                                <MenuItem key={item.id} value={item.id}>
                                                    {item.text}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                        <FormHelperText>Выберите верное соответствие</FormHelperText>
                                    </FormControl>
                                </Box>

                                <Divider />
                            </React.Fragment>
                        ))}
                    </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <LoadingButton
                        loading={isLoading}
                        disabled={!value && !sortValue.length && !variantValue.length}
                        color="success"
                        variant="contained"
                        onClick={handleAnswer}
                    >
                        Ответить
                    </LoadingButton>
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}
