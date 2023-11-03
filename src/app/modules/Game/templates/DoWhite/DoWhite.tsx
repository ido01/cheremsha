import { CheckCircleOutline as CheckCircleOutlineIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Paper,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import * as Colors from '@mui/material/colors'
import React, { useLayoutEffect, useState } from 'react'
import { EGameState, IGame, IGameResponse } from 'types/IGame'
import { request } from 'utils/request'

import { DoWhiteGame } from './components/DoWhiteGame'
import { DoWhiteInit } from './components/DoWhiteInit'
import { DoWhiteResults } from './components/DoWhiteResults'

export const DoWhite: React.FC = () => {
    const LINES = 3
    const GAP = 8

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    // Overlay block
    const [isInit, setInit] = useState<boolean>(false)
    const [width, setWidth] = useState<number>(0)
    const [size, setSize] = useState<number>(0)
    const [itemSize, setItemSize] = useState<number>(0)

    // Result block
    const [game, setGame] = useState<IGame>()
    const [points, setPoints] = useState<number>(0)
    const [state, setState] = useState<EGameState>(EGameState.INIT)
    const [openEnd, setOpenEnd] = useState<boolean>(false)

    useLayoutEffect(() => {
        function updateSize() {
            const padding = isMobile ? 8 : 32
            let calcWidth = 0
            if (document.body.clientWidth > document.body.clientHeight) {
                calcWidth = document.body.clientHeight - padding * 2 - 16 - 41
                // setWidth(document.body.clientHeight)
                setWidth(calcWidth)
            } else {
                calcWidth = document.body.clientWidth - padding * 2
                setWidth(calcWidth)
            }

            setSize(calcWidth)
            setItemSize((calcWidth - GAP * (LINES + 1)) / LINES)
        }
        updateSize()
        setInit(true)
        getGame()

        window.addEventListener('resize', updateSize)
        return () => {
            window.removeEventListener('resize', updateSize)
        }
    }, [])

    const handleCloseEnd = () => {
        getGame()
        setOpenEnd(false)
        setPoints(0)
        setState(EGameState.INIT)
    }

    const getGame = () => {
        request('games/do_white').then((response: IGameResponse) => {
            setGame(response.data)
        })
    }

    const endGame = (p: number) => {
        setPoints(p)
        setOpenEnd(true)
    }

    return (
        <Paper
            sx={{
                bgcolor: Colors.brown[100],
                height: '100%',
                width: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                pt: state === EGameState.GAME || state === EGameState.RESULT ? 1 : 4,
                pb: 4,
                px: isMobile ? 1 : 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '1 0 auto',
                overflow: 'hidden',
            }}
        >
            {isInit && (
                <Box
                    sx={{
                        width: `${width}px`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            justifyContent: 'space-between',
                            alignItems: isMobile ? 'flex-start' : 'flex-end',
                            mb: 2,
                        }}
                    >
                        <Box>
                            {(state === EGameState.GAME || state === EGameState.RESULT) && (
                                <Button onClick={handleCloseEnd} color="primary" variant="text">
                                    Назад
                                </Button>
                            )}

                            <Typography variant="h4" fontWeight="bold">
                                Собери белый
                            </Typography>
                        </Box>

                        {state === EGameState.GAME && (
                            <Typography variant="h6" fontWeight="bold">
                                Счет: {points}
                            </Typography>
                        )}

                        {state !== EGameState.GAME && (
                            <Typography variant="h6" fontWeight="bold">
                                Лучший: {game?.best}
                            </Typography>
                        )}
                    </Box>

                    <Paper
                        sx={{
                            bgcolor: Colors.brown[200],
                            height: `${size}px`,
                            width: `${size}px`,
                            overflow: state === EGameState.RESULT ? 'scroll' : 'hidden',
                            borderRadius: 2,
                            // p: isMobile ? 1 : 4,
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {state === EGameState.INIT && (
                            <DoWhiteInit
                                itemSize={itemSize}
                                width={size}
                                onChangeState={(newState) => setState(newState)}
                            />
                        )}

                        {state === EGameState.RESULT && <DoWhiteResults />}

                        {state === EGameState.GAME && (
                            <DoWhiteGame size={size} itemSize={itemSize} onEndGame={endGame} onSetPoints={setPoints} />
                        )}
                    </Paper>
                </Box>
            )}

            <Dialog open={openEnd} aria-labelledby="alert-dialog-title">
                {game && points > game?.best ? (
                    <DialogContent>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 120, mb: 4 }} />

                            <Typography variant="h5">Вы набрали: {points}</Typography>
                            <Typography variant="h5">Вы лучший!</Typography>
                        </Box>

                        <Box
                            sx={{
                                mt: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography sx={{ textAlign: 'center' }}>Нужно гордиться собой!</Typography>
                            <Typography sx={{ textAlign: 'center' }}>Я горжусь тобой!</Typography>
                            <Typography sx={{ textAlign: 'center' }}>
                                Ну хватит, надо еще постараться и стать лучше.
                            </Typography>
                        </Box>
                    </DialogContent>
                ) : (
                    <DialogContent>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <HighlightOffIcon color="error" sx={{ fontSize: 120, mb: 4 }} />

                            <Typography variant="h5">Вы набрали: {points}</Typography>
                            <Typography variant="h5">Лучший: {game?.best}</Typography>
                        </Box>

                        <Box
                            sx={{
                                mt: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography sx={{ textAlign: 'center' }}>Это не повод откисать!</Typography>
                            <Typography sx={{ textAlign: 'center' }}>Помни, есть кто-то хуже тебя!</Typography>
                            <Typography sx={{ textAlign: 'center' }}>Всегда так было, всегда так будет.</Typography>
                        </Box>
                    </DialogContent>
                )}

                <DialogActions>
                    <Button fullWidth onClick={handleCloseEnd} color="primary" variant="contained">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
}
