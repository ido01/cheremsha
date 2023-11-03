import { Box } from '@mui/material'
import * as Colors from '@mui/material/colors'
import React, { useEffect, useRef, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { rand } from 'utils/rand'
import { request } from 'utils/request'

import { EWay, IColorBlock, TColor, TCoord } from '../types/DoWhite'

const BlockColors: TColor[] = [
    {
        r: 255,
        g: 0,
        b: 0,
    },
    {
        r: 0,
        g: 255,
        b: 0,
    },
    {
        r: 0,
        g: 0,
        b: 255,
    },
]

interface DoWhiteGameProps {
    size: number
    itemSize: number
    onEndGame: (value: number) => void
    onSetPoints: (value: number) => void
}

export const DoWhiteGame: React.FC<DoWhiteGameProps> = ({ size, itemSize, onEndGame, onSetPoints }) => {
    const ref = useRef<HTMLCanvasElement>(null)
    const LINES = 3
    const GAP = 8
    const SPEED = 25
    const SPEED_TICK = 10
    const COLOR_STEPS = 10
    const HIDE_STEPS = 10

    // Overlay block
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

    // Game block
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
    const [isAnimated, setAnimated] = useState<boolean>(true)
    const [blocks, setBlocks] = useState<IColorBlock[]>([])
    const [lastEvent, setLasteEvent] = useState<EWay>()

    // Result block
    const [points, setPoints] = useState<number>(0)

    useEffect(() => {
        onSetPoints(points)
    }, [points])

    useEffect(() => {
        GameInit()
    }, [])

    const GameInit = () => {
        if (!ctx && ref.current) {
            setCtx(ref.current.getContext('2d'))
        }

        setPoints(0)
        setLasteEvent(undefined)
        const x1 = rand(0, 2)
        const y1 = rand(0, 2)
        const x2 = rand(0, 2)
        let y2 = rand(0, 2)
        if (y1 === y2) {
            y2 = (y2 + 1) % 3
        }

        setBlocks([
            {
                id: '1',
                preyId: '',
                currentPosition: {
                    x: x1,
                    y: y1,
                },
                nextPosition: {
                    x: x1 * (itemSize + GAP),
                    y: y1 * (itemSize + GAP),
                },
                pixelPosition: {
                    x: x1 * (itemSize + GAP),
                    y: y1 * (itemSize + GAP),
                },
                color: BlockColors[rand(0, BlockColors.length - 1)],
                diffColor: {
                    r: 0,
                    g: 0,
                    b: 0,
                },
                stepColor: {
                    r: 0,
                    g: 0,
                    b: 0,
                },
                finalSteps: 0,
                die: false,
                bingo: false,
            },
            {
                id: '2',
                preyId: '',
                currentPosition: {
                    x: x2,
                    y: y2,
                },
                nextPosition: {
                    x: x2 * (itemSize + GAP),
                    y: y2 * (itemSize + GAP),
                },
                pixelPosition: {
                    x: x2 * (itemSize + GAP),
                    y: y2 * (itemSize + GAP),
                },
                color: BlockColors[rand(0, BlockColors.length - 1)],
                diffColor: {
                    r: 0,
                    g: 0,
                    b: 0,
                },
                stepColor: {
                    r: 0,
                    g: 0,
                    b: 0,
                },
                finalSteps: 0,
                die: false,
                bingo: false,
            },
        ])

        setAnimated(false)
    }

    useEffect(() => {
        draw()
    }, [ctx, blocks])

    const draw = () => {
        if (!ctx) return
        ctx.clearRect(0, 0, size, size)

        ctx.fillStyle = Colors.brown[300]
        fillRoundedRect(0, 0, size, size, GAP)

        ctx.fillStyle = Colors.brown[200]
        for (let y = 0; y < LINES; y++) {
            for (let x = 0; x < LINES; x++) {
                fillRoundedRect(x * (itemSize + GAP) + GAP, y * (itemSize + GAP) + GAP, itemSize, itemSize, GAP)
            }
        }

        blocks.forEach((block) => {
            ctx.fillStyle = `rgba(${block.color.r}, ${block.color.g}, ${block.color.b}, ${
                (0.5 * (HIDE_STEPS - block.finalSteps)) / HIDE_STEPS
            })`
            fillRoundedRect(
                block.pixelPosition.x + GAP - block.finalSteps,
                block.pixelPosition.y + GAP - block.finalSteps,
                itemSize + 2 * block.finalSteps,
                itemSize + 2 * block.finalSteps,
                GAP
            )
        })
    }

    const fillRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
        if (!ctx) return

        ctx.beginPath()
        ctx.moveTo(x + w / 2, y)
        ctx.arcTo(x + w, y, x + w, y + h / 2, r)
        ctx.arcTo(x + w, y + h, x + w / 2, y + h, r)
        ctx.arcTo(x, y + h, x, y + h / 2, r)
        ctx.arcTo(x, y, x + w / 2, y, r)
        ctx.closePath()
        ctx.fill()
    }

    const moveTo = (way: EWay) => {
        setAnimated(true)
        setBlocks((values) => {
            const sort = [...values]
            sort.sort((a, b) => {
                switch (way) {
                    case EWay.LEFT:
                        return a.currentPosition.x - b.currentPosition.x
                    case EWay.RIGHT:
                        return b.currentPosition.x - a.currentPosition.x
                    case EWay.UP:
                        return a.currentPosition.y - b.currentPosition.y
                    case EWay.DOWN:
                        return b.currentPosition.y - a.currentPosition.y
                }
            })
            const newValues = sort.reduce((old, block) => {
                const [newBlock, mutationBlock] = getEndPositionBlock(way, block, old)
                return old.map((item) => {
                    if (item.id === newBlock.id) {
                        return newBlock
                    }

                    if (mutationBlock && item.id === mutationBlock.id) {
                        return mutationBlock
                    }

                    return item
                })
            }, sort)
            return newValues
        })
        setTimeout(() => {
            animatedMove(false)
        }, SPEED_TICK)
    }

    const getEndPositionBlock = (way: EWay, block: IColorBlock, old: IColorBlock[]): IColorBlock[] => {
        switch (way) {
            case EWay.RIGHT:
                for (let x = block.currentPosition.x + 1; x < LINES; x++) {
                    const findItem = old.find(
                        (item) => item.currentPosition.x === x && item.currentPosition.y === block.currentPosition.y
                    )
                    if (findItem) {
                        return mutationBlock(block, findItem)
                    } else {
                        block = getPosition(block, x, block.currentPosition.y)
                    }
                }

                return [block]
            case EWay.DOWN:
                for (let y = block.currentPosition.y + 1; y < LINES; y++) {
                    const findItem = old.find(
                        (item) => item.currentPosition.x === block.currentPosition.x && item.currentPosition.y === y
                    )
                    if (findItem) {
                        return mutationBlock(block, findItem)
                    } else {
                        block = getPosition(block, block.currentPosition.x, y)
                    }
                }

                return [block]
            case EWay.LEFT:
                for (let x = block.currentPosition.x - 1; x >= 0; x--) {
                    const findItem = old.find(
                        (item) => item.currentPosition.x === x && item.currentPosition.y === block.currentPosition.y
                    )
                    if (findItem) {
                        return mutationBlock(block, findItem)
                    } else {
                        block = getPosition(block, x, block.currentPosition.y)
                    }
                }

                return [block]
            case EWay.UP:
                for (let y = block.currentPosition.y - 1; y >= 0; y--) {
                    const findItem = old.find(
                        (item) => item.currentPosition.x === block.currentPosition.x && item.currentPosition.y === y
                    )
                    if (findItem) {
                        return mutationBlock(block, findItem)
                    } else {
                        block = getPosition(block, block.currentPosition.x, y)
                    }
                }

                return [block]
        }
        return [block]
    }

    const getPosition = (block: IColorBlock, x: number, y: number) => ({
        ...block,
        currentPosition: {
            x: x,
            y: y,
        },
        nextPosition: {
            x: x * (itemSize + GAP),
            y: y * (itemSize + GAP),
        },
    })

    const mutationBlock = (block: IColorBlock, wayItem: IColorBlock): IColorBlock[] => {
        if (
            block.color.r === 255 &&
            wayItem.color.r === 255 &&
            block.color.g === 255 &&
            wayItem.color.g === 255 &&
            block.color.b === 255 &&
            wayItem.color.b === 255
        ) {
            if (wayItem.die) {
                setPoints((value) => value + 200)
            } else {
                setPoints((value) => value + 100)
            }
            return [
                {
                    ...block,
                    currentPosition: wayItem.currentPosition,
                    nextPosition: wayItem.nextPosition,
                    preyId: wayItem.id,
                    bingo: true,
                },
                {
                    ...wayItem,
                    die: true,
                },
            ]
        }
        if (wayItem.preyId || wayItem.die) return [block]
        if (block.color.r + wayItem.color.r > 255) return [block]
        if (block.color.g + wayItem.color.g > 255) return [block]
        if (block.color.b + wayItem.color.b > 255) return [block]

        if (
            block.color.r + wayItem.color.r === 255 &&
            block.color.g + wayItem.color.g === 255 &&
            block.color.b + wayItem.color.b === 255
        ) {
            setPoints((value) => value + 50)
        } else {
            setPoints((value) => value + 10)
        }

        return [
            {
                ...block,
                currentPosition: wayItem.currentPosition,
                nextPosition: wayItem.nextPosition,
                preyId: wayItem.id,
                diffColor: wayItem.color,
                stepColor: {
                    r: wayItem.color.r / COLOR_STEPS,
                    g: wayItem.color.g / COLOR_STEPS,
                    b: wayItem.color.b / COLOR_STEPS,
                },
            },
            {
                ...wayItem,
                die: true,
            },
        ]
    }

    const mutationColor = (block: IColorBlock, color: 'r' | 'g' | 'b') => {
        return {
            ...block,
            color: {
                ...block.color,
                [color]:
                    block.color[color] + block.stepColor[color] > 255
                        ? 255
                        : block.color[color] + block.stepColor[color],
            },
            diffColor: {
                ...block.diffColor,
                [color]:
                    block.diffColor[color] - block.stepColor[color] < 0
                        ? 0
                        : block.diffColor[color] - block.stepColor[color],
            },
        }
    }

    const animatedFinish = () => {
        setBlocks((values) => {
            let change = false
            let finish = false
            const newValues = values.map((block) => {
                if (block.finalSteps <= HIDE_STEPS && block.bingo) {
                    change = true
                    return {
                        ...block,
                        finalSteps: block.finalSteps + 1,
                    }
                } else if (block.finalSteps > HIDE_STEPS) {
                    finish = true
                }

                return block
            })

            if (change) {
                setTimeout(() => {
                    animatedFinish()
                }, SPEED_TICK)
            } else {
                const emptys: TCoord[] = []
                for (let x = 0; x < LINES; x++) {
                    for (let y = 0; y < LINES; y++) {
                        if (
                            newValues.findIndex(
                                (item) => item.currentPosition.x === x && item.currentPosition.y === y
                            ) === -1
                        ) {
                            emptys.push({ x, y })
                        }
                    }
                }
                nextStep(emptys)
            }

            if (finish) {
                return newValues.filter((block) => block.finalSteps < HIDE_STEPS)
            } else {
                return newValues
            }
        })
    }

    const animatedMutation = () => {
        setBlocks((values) => {
            let change = false
            const ids = values.filter((block) => !!block.preyId).map((block) => block.preyId)
            const newValues = values
                .filter((block) => ids.indexOf(block.id) === -1)
                .map((block) => {
                    block = {
                        ...block,
                        preyId: '',
                    }
                    if (block.diffColor.r > 0) {
                        change = true
                        return mutationColor(block, 'r')
                    }

                    if (block.diffColor.g > 0) {
                        change = true
                        return mutationColor(block, 'g')
                    }

                    if (block.diffColor.b > 0) {
                        change = true
                        return mutationColor(block, 'b')
                    }
                    return block
                })

            if (change) {
                setTimeout(() => {
                    animatedMutation()
                }, SPEED_TICK)
            } else {
                setTimeout(() => {
                    animatedFinish()
                }, SPEED_TICK)
            }

            return newValues
        })
    }

    const animatedMove = (need_new_block: boolean) => {
        setBlocks((values) => {
            let change = false
            const newValues = values.map((block) => {
                if (block.pixelPosition.x !== block.nextPosition.x) {
                    change = true
                    let newX = block.pixelPosition.x
                    if (block.pixelPosition.x > block.nextPosition.x) {
                        newX -= SPEED
                        if (newX < block.nextPosition.x) {
                            newX = block.nextPosition.x
                        }
                    } else if (block.pixelPosition.x < block.nextPosition.x) {
                        newX += SPEED
                        if (newX > block.nextPosition.x) {
                            newX = block.nextPosition.x
                        }
                    }

                    return {
                        ...block,
                        pixelPosition: {
                            ...block.pixelPosition,
                            x: newX,
                        },
                    }
                } else if (block.pixelPosition.y !== block.nextPosition.y) {
                    change = true
                    let newY = block.pixelPosition.y
                    if (block.pixelPosition.y > block.nextPosition.y) {
                        newY -= SPEED
                        if (newY < block.nextPosition.y) {
                            newY = block.nextPosition.y
                        }
                    } else {
                        newY += SPEED
                        if (newY > block.nextPosition.y) {
                            newY = block.nextPosition.y
                        }
                    }

                    return {
                        ...block,
                        pixelPosition: {
                            ...block.pixelPosition,
                            y: newY,
                        },
                    }
                }
                return block
            })

            if (change) {
                setTimeout(() => {
                    animatedMove(true)
                }, SPEED_TICK)
            } else {
                if (need_new_block) {
                    setTimeout(() => {
                        animatedMutation()
                    }, SPEED_TICK)
                } else {
                    setTimeout(() => {
                        setAnimated(false)
                    }, SPEED_TICK)
                }
            }

            return newValues
        })
    }

    const nextStep = async (emptys: TCoord[]) => {
        if (!emptys.length) return

        const index = rand(0, emptys.length - 1)

        setBlocks((values) => {
            const uniqueId = `${new Date().getTime()}`
            let colors: TColor = values.reduce(
                (color, block) => {
                    return {
                        r: color.r + block.color.r / 255,
                        g: color.g + block.color.g / 255,
                        b: color.b + block.color.b / 255,
                    }
                },
                { r: 0, g: 0, b: 0 }
            )
            const fullWeightColor = colors.r + colors.g + colors.b
            colors = {
                r: fullWeightColor - colors.r,
                g: fullWeightColor - colors.g,
                b: fullWeightColor - colors.b,
            }
            // if (colors.r <= colors.g && colors.r <= colors.b) {
            //     colors = {
            //         r: 0,
            //         g: colors.g - colors.r,
            //         b: colors.b - colors.r,
            //     }
            // } else if (colors.g <= colors.r && colors.g <= colors.b) {
            //     colors = {
            //         r: colors.r - colors.g,
            //         g: 0,
            //         b: colors.b - colors.g,
            //     }
            // } else if (colors.b <= colors.r && colors.b <= colors.g) {
            //     colors = {
            //         r: colors.r - colors.b,
            //         g: colors.g - colors.b,
            //         b: 0,
            //     }
            // }
            const randIndex = rand(0, colors.r + colors.g + colors.b)
            const colorIndex = randIndex < colors.r ? 0 : randIndex < colors.r + colors.g ? 1 : 2

            return [
                ...values,
                {
                    id: uniqueId,
                    preyId: '',
                    currentPosition: {
                        x: emptys[index].x,
                        y: emptys[index].y,
                    },
                    nextPosition: {
                        x: emptys[index].x * (itemSize + GAP),
                        y: emptys[index].y * (itemSize + GAP),
                    },
                    pixelPosition: {
                        x: emptys[index].x * (itemSize + GAP),
                        y: emptys[index].y * (itemSize + GAP),
                    },
                    color: BlockColors[colorIndex],
                    diffColor: {
                        r: 0,
                        g: 0,
                        b: 0,
                    },
                    stepColor: {
                        r: 0,
                        g: 0,
                        b: 0,
                    },
                    finalSteps: 0,
                    die: false,
                    bingo: false,
                },
            ]
        })

        setTimeout(() => {
            setAnimated(false)
        }, SPEED_TICK)
    }

    useEffect(() => {
        if (blocks.length < LINES * LINES) return
        const canMove = blocks.reduce((can, block) => {
            if (!can) {
                let newCan = canGetEndPositionBlock(EWay.UP, block, blocks)
                if (!newCan) {
                    newCan = canGetEndPositionBlock(EWay.RIGHT, block, blocks)
                }
                if (!newCan) {
                    newCan = canGetEndPositionBlock(EWay.DOWN, block, blocks)
                }
                if (!newCan) {
                    newCan = canGetEndPositionBlock(EWay.LEFT, block, blocks)
                }
                return newCan
            }
            return can
        }, false)

        if (!canMove) {
            endGame()
        }
    }, [blocks])

    const canGetEndPositionBlock = (way: EWay, block: IColorBlock, old: IColorBlock[]): boolean => {
        switch (way) {
            case EWay.RIGHT:
                for (let x = block.currentPosition.x + 1; x < LINES; x++) {
                    const findItem = old.find(
                        (item) => item.currentPosition.x === x && item.currentPosition.y === block.currentPosition.y
                    )
                    if (findItem) {
                        return canMutationBlock(block, findItem)
                    } else {
                        return true
                    }
                }
                return false
            case EWay.DOWN:
                for (let y = block.currentPosition.y + 1; y < LINES; y++) {
                    const findItem = old.find(
                        (item) => item.currentPosition.x === block.currentPosition.x && item.currentPosition.y === y
                    )
                    if (findItem) {
                        return canMutationBlock(block, findItem)
                    } else {
                        return true
                    }
                }

                return false
            case EWay.LEFT:
                for (let x = block.currentPosition.x - 1; x >= 0; x--) {
                    const findItem = old.find(
                        (item) => item.currentPosition.x === x && item.currentPosition.y === block.currentPosition.y
                    )
                    if (findItem) {
                        return canMutationBlock(block, findItem)
                    } else {
                        return true
                    }
                }

                return false
            case EWay.UP:
                for (let y = block.currentPosition.y - 1; y >= 0; y--) {
                    const findItem = old.find(
                        (item) => item.currentPosition.x === block.currentPosition.x && item.currentPosition.y === y
                    )
                    if (findItem) {
                        return canMutationBlock(block, findItem)
                    } else {
                        return true
                    }
                }

                return false
        }
        return false
    }

    const canMutationBlock = (block: IColorBlock, wayItem: IColorBlock): boolean => {
        if (
            block.color.r === 255 &&
            wayItem.color.r === 255 &&
            block.color.g === 255 &&
            wayItem.color.g === 255 &&
            block.color.b === 255 &&
            wayItem.color.b === 255
        ) {
            return true
        }
        if (wayItem.preyId || wayItem.die) return false
        if (block.color.r + wayItem.color.r > 255) return false
        if (block.color.g + wayItem.color.g > 255) return false
        if (block.color.b + wayItem.color.b > 255) return false

        return true
    }

    useEffect(() => {
        if (lastEvent && !isAnimated) {
            if (timer) {
                clearTimeout(timer)
            }

            setTimer(
                setTimeout(() => {
                    eventInit()
                }, 100)
            )
        }
    }, [isAnimated, blocks, lastEvent])

    const eventInit = () => {
        if (lastEvent) {
            moveTo(lastEvent)
        }
        setLasteEvent(undefined)
    }

    const eventListener = (e: any) => {
        if (isAnimated) return
        if (e.keyCode === 39) {
            setLasteEvent(EWay.RIGHT)
        } else if (e.keyCode === 40) {
            setLasteEvent(EWay.DOWN)
        } else if (e.keyCode === 37) {
            setLasteEvent(EWay.LEFT)
        } else if (e.keyCode === 38) {
            setLasteEvent(EWay.UP)
        }
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => setLasteEvent(EWay.LEFT),
        onSwipedRight: () => setLasteEvent(EWay.RIGHT),
        onSwipedUp: () => setLasteEvent(EWay.UP),
        onSwipedDown: () => setLasteEvent(EWay.DOWN),
        preventScrollOnSwipe: true,
    })

    useEffect(() => {
        document.addEventListener('keyup', eventListener)
        return () => {
            document.removeEventListener('keyup', eventListener)
        }
    }, [eventListener])

    const endGame = () => {
        setCtx(null)
        onEndGame(points)
        setAnimated(true)
        setLasteEvent(undefined)
        request('games/do_white', {
            method: 'POST',
            data: {
                points,
            },
        })
    }

    return (
        <>
            <Box
                {...handlers}
                sx={{
                    position: 'fixed',
                    top: '40px',
                    left: 0,
                    width: '100%',
                    height: 'calc( 100% - 40px )',
                    userSelect: 'none',
                }}
            />
            <canvas ref={ref} width={size} height={size} />
        </>
    )
}
