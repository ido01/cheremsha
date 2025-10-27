import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EGameState } from 'types/IGame'

interface FindColorInitProps {
    itemSize: number
    width: number
    onChangeState: (state: EGameState) => void
}

export const DoWhiteInit: React.FC<FindColorInitProps> = ({ itemSize, width, onChangeState }) => {
    const history = useNavigate()

    const [activeStep, setActiveStep] = useState(0)
    const [openHelp, setOpenHelp] = useState<boolean>(false)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleRules = () => {
        setActiveStep(0)
        setOpenHelp(true)
    }

    return (
        <>
            <Box
                sx={{
                    flex: '1 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 2,
                    px: 4,
                }}
            >
                <Button color="success" variant="contained" size="large" onClick={() => onChangeState(EGameState.GAME)}>
                    Новая игра
                </Button>
                <Button
                    color="warning"
                    variant="contained"
                    size="large"
                    onClick={() => onChangeState(EGameState.RESULT)}
                >
                    Результаты
                </Button>
                <Button color="primary" variant="contained" size="large" onClick={handleRules}>
                    Правила игры
                </Button>
                <Button color="error" variant="contained" size="large" onClick={() => history('/games')}>
                    Выйти с игры
                </Button>
            </Box>
            <Dialog fullWidth open={openHelp} onClose={() => setOpenHelp(false)} aria-labelledby="alert-dialog-title">
                <DialogTitle>Как играть</DialogTitle>

                <DialogContent sx={{ width: `${width}px` }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        <Step key={0}>
                            <StepLabel>Шаг 1</StepLabel>
                            <StepContent>
                                <Typography>Соединяйте цвета, что бы смешать их</Typography>

                                <Box
                                    sx={{
                                        my: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,0,0,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">+</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(0,0,255,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">=</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,0,255,0.7)',
                                        }}
                                    />
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                                            Далее
                                        </Button>
                                        <Button disabled onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                                            Назад
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                        <Step key={1}>
                            <StepLabel>Шаг 2</StepLabel>
                            <StepContent>
                                <Typography>
                                    Если вы смешаете Красный, Зеленый и Синий цвета, то вы получите Белый
                                </Typography>

                                <Box
                                    sx={{
                                        my: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(0,0,255,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">+</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,0,0,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">+</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(0,255,0,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">=</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,255,255,1)',
                                            border: '1px solid #aaa',
                                        }}
                                    />
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                                            Далее
                                        </Button>
                                        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                                            Назад
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                        <Step key={2}>
                            <StepLabel>Шаг 3</StepLabel>
                            <StepContent>
                                <Typography>Соедините 2 Белых цвета, и они исчезнут</Typography>

                                <Box
                                    sx={{
                                        my: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,255,255,1)',
                                            border: '1px solid #aaa',
                                        }}
                                    />

                                    <Typography variant="h6">+</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,255,255,1)',
                                            border: '1px solid #aaa',
                                        }}
                                    />

                                    <Typography variant="h6">=</Typography>

                                    <Typography variant="h6">ПУФ</Typography>
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                                            Далее
                                        </Button>
                                        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                                            Назад
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>

                        <Step key={3}>
                            <StepLabel optional={<Typography variant="caption">Сложность</Typography>}>Шаг 4</StepLabel>
                            <StepContent>
                                <Typography>Соединять одинаковые цвета нельзя</Typography>
                                <Typography>
                                    Не получится соединить Желтый с Зеленым, так как Желтый уже содержит Зеленый цвет
                                </Typography>

                                <Box
                                    sx={{
                                        my: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(0,255,0,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">+</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,255,0,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">=</Typography>

                                    <Box sx={{ display: 'flex' }}>
                                        <Box
                                            sx={{
                                                width: `${itemSize / 2}px`,
                                                height: `${itemSize / 2}px`,
                                                borderRadius: 1,
                                                bgcolor: 'rgba(0,255,0,0.7)',
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                width: `${itemSize / 2}px`,
                                                height: `${itemSize / 2}px`,
                                                borderRadius: 1,
                                                bgcolor: 'rgba(255,255,0,0.7)',
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                                            Далее
                                        </Button>
                                        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                                            Назад
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>

                        <Step key={4}>
                            <StepLabel>Шаг 5</StepLabel>
                            <StepContent>
                                <Typography>Все комбинации</Typography>

                                <Box
                                    sx={{
                                        my: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,0,0,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">+</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(0,255,0,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">=</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,255,0,0.7)',
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        my: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,0,0,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">+</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(0,0,255,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">=</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,0,255,0.7)',
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        my: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(0,255,0,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">+</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(0,0,255,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">=</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(0,255,255,0.7)',
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        my: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,255,0,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">+</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(0,0,255,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">=</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,255,255,1)',
                                            border: '1px solid #aaa',
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        my: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,0,255,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">+</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(0,255,0,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">=</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,255,255,1)',
                                            border: '1px solid #aaa',
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        my: 2,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(0,255,255,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">+</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,0,0,0.7)',
                                        }}
                                    />

                                    <Typography variant="h6">=</Typography>

                                    <Box
                                        sx={{
                                            width: `${itemSize / 2}px`,
                                            height: `${itemSize / 2}px`,
                                            borderRadius: 1,
                                            bgcolor: 'rgba(255,255,255,1)',
                                            border: '1px solid #aaa',
                                        }}
                                    />
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={() => setOpenHelp(false)}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Играть
                                        </Button>
                                        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                                            Назад
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    </Stepper>
                </DialogContent>
            </Dialog>
        </>
    )
}
