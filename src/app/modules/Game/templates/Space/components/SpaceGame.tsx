import {
    FormatListNumbered as FormatListNumberedIcon,
    Logout as LogoutIcon,
    PauseCircleOutline as PauseCircleOutlineIcon,
} from '@mui/icons-material'
import { Box, Button, Dialog, IconButton, Typography } from '@mui/material'
import * as Colors from '@mui/material/colors'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IGame } from 'types/IGame'
import { rand } from 'utils/rand'
import { request } from 'utils/request'

import {
    ESpaceStatus,
    IGameResponse,
    IHelp,
    IPlanet,
    IPlanetResponse,
    IRocket,
    ISoneShell,
    ISpaceSize,
    IStar,
    IStone,
    IVisibleSpaceSize,
    TCoord,
} from '../types/Space'
import { getAngle, getNewInitCoord, getRadius } from '../utils/angle'
import { drawFromPlanet, drawHelp, drawLives, drawPlanet, drawRocket, drawWay } from '../utils/canvas'
import { drawStar, moveStar, Star } from '../utils/star'
import { crashStone, drawStone, initStoneSprite, moveStone, Stone } from '../utils/stone'
import { InitVisible, isPointInside, reAngleVisible } from '../utils/visible'
import { Results } from './Results'

const starColors: string[] = [Colors.yellow[50], Colors.yellow[100], Colors.yellow[200]]

const biasPoints: TCoord[] = [
    {
        x: 20,
        y: 0,
    },
    {
        x: 20,
        y: 10,
    },
    {
        x: 10,
        y: 10,
    },
    {
        x: 10,
        y: -20,
    },
    {
        x: 0,
        y: -20,
    },
    {
        x: -10,
        y: 0,
    },
    {
        x: -20,
        y: 0,
    },
    {
        x: -20,
        y: 10,
    },
]

const badEnds: string[] = [
    'Отличная попытка, но в следующий раз старайтесь',
    'Как говорил мой отец: "Отстань, я новости смотрю". Мне тогда не помогло, может вам поможет',
    'Астрологи говорят, что у тебя все получится! Астрономы говорят: "Бдыщ"',
    'Да, результат не лучший, но как круто ты облетел двенадцатый Астероид - это просто пушка',
    'Тебе слабо попробовать еще раз',
    'Первый блин комом, хватит делать первые блины!',
    'Встречаются как-то Американец, Немец и Русский. И все трое сошлись на том, что твой результат так себе',
    'Тебе надо отдохнуть, например ты можешь поиграть в эту игру',
    'Когда-то я подавал большие надежды. Ходили слухи, что я буду хранить научные работы. Но теперь я тут и должен хранить твой скверный результат. Тебе следует постараться для меня',
]

export const SpaceGame: React.FC = () => {
    const history = useHistory()

    const isGameInit = useRef<boolean>(false)
    const ref = useRef<HTMLCanvasElement>(null)
    const refPoint = useRef<HTMLDivElement>(null)
    const ROCKET_RADIUS = 3
    const STONE_COUNT = 14
    const tick_time = useRef<number>(0)
    const new_tick_time = useRef<number>(0)
    const current_tick = useRef<number>(0)
    const currentStoneSpeed = useRef<TCoord>({
        x: 0,
        y: 0,
    })
    const currentStarSpeed = useRef<TCoord>({
        x: 0,
        y: 0,
    })
    const doublePi = Math.PI * 2

    // Overlay block
    const starSprite = useRef<HTMLCanvasElement | null>(null)
    const stoneShell = useRef<ISoneShell[]>([])
    const rocketSprite = useRef<HTMLCanvasElement | null>(null)
    const liveSprite = useRef<HTMLCanvasElement | null>(null)
    const healthSprite = useRef<HTMLCanvasElement | null>(null)
    const shieldSprite = useRef<HTMLCanvasElement | null>(null)
    const waySprite = useRef<HTMLCanvasElement | null>(null)
    const ctx = useRef<CanvasRenderingContext2D | null>(null)
    const width = useRef<number>(0)
    const height = useRef<number>(0)
    const planetSize = useRef<number>(0)
    const halfPlanetSize = useRef<number>(0)
    const starCount = useRef<number>(0)
    const stoneCount = useRef<number>(0)
    const [widthState, setWidth] = useState<number>(0)
    const [heightState, setHeight] = useState<number>(0)
    const spaceRadius = useRef<number>(0)
    const doubleSpaceRadius = useRef<number>(0)
    const rocketSize = useRef<number>(0)
    const deltaRocketPosition = useRef<number>(0)
    const lockResetSize = useRef<number>(0)
    const moveLockSize = useRef<number>(0)
    const spaceCoord = useRef<ISpaceSize>()
    const starSize = useRef<number>(0)
    const halfStarSize = useRef<number>(0)
    const stoneSize = useRef<number>(0)
    const deltaStoneSize = useRef<TCoord>({
        x: 0,
        y: 0,
    })
    const doubleStoneSize = useRef<number>(0)
    const stoneCrashSize = useRef<number>(0)
    const startMove = useRef<TCoord>()
    const center = useRef<TCoord>({
        x: 0,
        y: 0,
    })

    // visible helps
    const visibleStoneCoord = useRef<IVisibleSpaceSize>()
    const visiblePlanetCoord = useRef<IVisibleSpaceSize>()
    const visiblePlanetWayCoord = useRef<IVisibleSpaceSize>()

    // New Game
    const inGame = useRef<boolean>(false)
    const points = useRef<number>(0)
    const speed = useRef<number>(0)
    const lives = useRef<number>(3)
    const moveLock = useRef<boolean>(true)
    const lockReset = useRef<boolean>(false)
    const bias = useRef<number>()
    const spaceAngle = useRef<number>(0)
    const speedAngle = useRef<TCoord>({
        x: 0,
        y: 0,
    })
    const stars = useRef<IStar[]>([])
    const stones = useRef<IStone[]>([])
    const planet = useRef<IPlanet>()
    const fromPlanet = useRef<IPlanet>()
    const health = useRef<IHelp>({
        coord: {
            x: 0,
            y: 0,
        },
        visible: false,
    })
    const shield = useRef<IHelp>({
        coord: {
            x: 0,
            y: 0,
        },
        visible: false,
    })
    const rocket = useRef<IRocket>({
        up: {
            x: 0,
            y: 0,
        },
        left: {
            x: 0,
            y: 0,
        },
        right: {
            x: 0,
            y: 0,
        },
        center: {
            x: 0,
            y: 0,
        },
        visible: 0,
        shield: 0,
        fullShield: 0,
    })

    // Game
    const planetImage = useRef<HTMLImageElement>()
    const fromPlanetImage = useRef<HTMLImageElement>()
    const status = useRef<ESpaceStatus>(ESpaceStatus.INIT)
    const [statusState, setStatus] = useState<ESpaceStatus>(ESpaceStatus.INIT)
    const [openSuccess, setOpenSuccess] = useState<boolean>(false)
    const [openCrash, setOpenCrash] = useState<boolean>(false)
    const [crashMess, setCrashMess] = useState<string>('')
    const [game, setGame] = useState<IGame>()
    const [planetData, setPlanet] = useState<IPlanetResponse>()
    const [planetModal, setPlanetModal] = useState<IPlanetResponse>()
    const [fromPlanetData, setFromPlanet] = useState<IPlanetResponse>()
    const [isResultsOpen, setResultsOpen] = useState<boolean>(false)

    useLayoutEffect(() => {
        function updateSize() {
            let actualSize = 0
            let nSpaceRadius = 0
            width.current = document.body.clientWidth
            setWidth(document.body.clientWidth)
            height.current = window.innerHeight
            setHeight(window.innerHeight)
            if (document.body.clientWidth > window.innerHeight) {
                nSpaceRadius = document.body.clientWidth * 1.5
                actualSize = document.body.clientWidth
            } else {
                nSpaceRadius = window.innerHeight * 1.5
                actualSize = window.innerHeight
            }
            // starCount.current = nSpaceRadius / 5
            starCount.current = 36
            stoneCount.current = nSpaceRadius / 9
            // stoneCount.current = nSpaceRadius * 10
            const nRocketSize = window.innerHeight * 0.05
            const nCenter: TCoord = {
                x: document.body.clientWidth / 2,
                y: window.innerHeight * 0.7,
            }
            const nSpaceCoord: ISpaceSize = {
                start: {
                    x: nCenter.x - nSpaceRadius,
                    y: nCenter.y - nSpaceRadius,
                },
                end: {
                    x: nCenter.x + nSpaceRadius,
                    y: nCenter.y + nSpaceRadius,
                },
            }

            planetSize.current = width.current > height.current ? height.current : width.current
            halfPlanetSize.current = planetSize.current * 0.5
            spaceRadius.current = nSpaceRadius
            doubleSpaceRadius.current = nSpaceRadius * 2
            spaceCoord.current = nSpaceCoord
            stoneSize.current = actualSize * 0.1
            deltaStoneSize.current = {
                x: stoneSize.current * 1.5 + 4,
                y: stoneSize.current + 4,
            }
            doubleStoneSize.current = actualSize * 0.2
            stoneCrashSize.current = actualSize * 0.15
            starSize.current = actualSize
            halfStarSize.current = actualSize * 0.5
            rocketSize.current = nRocketSize
            deltaRocketPosition.current = nRocketSize / 2 + ROCKET_RADIUS + 1
            lockResetSize.current = window.innerHeight * 4.5
            moveLockSize.current = window.innerHeight * 1.5
            center.current = nCenter
            newRocketPosition()

            visibleStoneCoord.current = InitVisible(
                nCenter,
                { x: -doubleStoneSize.current, y: -doubleStoneSize.current },
                { x: width.current + doubleStoneSize.current, y: height.current + doubleStoneSize.current }
            )
            visiblePlanetCoord.current = InitVisible(
                nCenter,
                { x: -planetSize.current, y: -planetSize.current },
                { x: width.current + planetSize.current, y: height.current + planetSize.current }
            )
            visiblePlanetWayCoord.current = InitVisible(
                nCenter,
                { x: 0, y: 0 },
                { x: width.current, y: height.current }
            )
        }
        updateSize()
        getGame()
        GameInit()

        window.addEventListener('resize', updateSize)
        return () => {
            window.removeEventListener('resize', updateSize)
        }
    }, [])

    const GameInit = () => {
        if (spaceCoord.current && center.current && spaceRadius.current && rocketSize.current) {
            if (!ctx.current && ref.current) {
                ctx.current = ref.current.getContext('2d', { alpha: false })
            }

            initSprites()

            newRocketPosition()

            const spaceRadiusPow = Math.pow(spaceRadius.current, 2)

            stars.current = []
            for (let i = 0; i <= starCount.current; i++) {
                stars.current.push(Star(spaceCoord.current))
            }

            stones.current = []
            for (let i = 0; i <= stoneCount.current; i++) {
                stones.current.push(Stone(spaceCoord.current, rand(0, STONE_COUNT)))
            }

            const x_health = rand(spaceCoord.current.start.x, spaceCoord.current.end.x)
            const y_health = Math.sqrt(spaceRadiusPow - Math.pow(center.current.x - x_health, 2))
            health.current.coord = {
                x: x_health,
                y: rand(center.current.y - y_health, center.current.y + y_health),
            }

            const x_shield = rand(spaceCoord.current.start.x, spaceCoord.current.end.x)
            const y_shield = Math.sqrt(spaceRadiusPow - Math.pow(center.current.x - x_shield, 2))
            shield.current.coord = {
                x: x_health,
                y: rand(center.current.y - y_shield, center.current.y + y_shield),
            }
            tick_time.current = new Date().getTime()
            if (!isGameInit.current) {
                isGameInit.current = true
                console.log('menu(3)')
                move()
            }
        }
    }

    const initSprites = () => {
        initStarSprite()
        initStonesSprite()
        initRocketSprite()
        initLiveSprite()
        initHealthSprite()
        initShieldSprite()
        initWaySprite()
    }

    const initWaySprite = () => {
        if (!waySprite.current) {
            waySprite.current = document.createElement('canvas')
            waySprite.current.width = 44
            waySprite.current.height = 44
            const wayCtx = waySprite.current.getContext('2d')
            if (wayCtx) {
                const point: TCoord = {
                    x: 22,
                    y: 22,
                }
                for (let i = 1; i <= 10; i++) {
                    wayCtx.beginPath()
                    wayCtx.fillStyle = `rgba(255, 111, 0, ${i / 10})`
                    wayCtx.arc(point.x, point.y, 22 - 2 * i, 0, 2 * Math.PI)
                    wayCtx.fill()
                }
            }
        }
    }

    const initHealthSprite = () => {
        if (!healthSprite.current) {
            healthSprite.current = document.createElement('canvas')
            healthSprite.current.width = 42
            healthSprite.current.height = 42
            const healthCtx = healthSprite.current.getContext('2d')
            if (healthCtx) {
                const point: TCoord = {
                    x: 21,
                    y: 21,
                }
                healthCtx.strokeStyle = `#f50057`
                healthCtx.beginPath()
                healthCtx.arc(point.x, point.y, 20, 0, 2 * Math.PI)
                healthCtx.stroke()

                healthCtx.fillStyle = `#f50057`
                healthCtx.beginPath()
                healthCtx.moveTo(point.x, point.y - 5)
                healthCtx.bezierCurveTo(point.x + 15, point.y - 20, point.x + 20, point.y, point.x, point.y + 16)
                healthCtx.bezierCurveTo(point.x - 20, point.y, point.x - 15, point.y - 20, point.x, point.y - 5)
                healthCtx.fill()

                healthCtx.fillStyle = `rgba(245, 0, 87, 0.3)`
                healthCtx.beginPath()
                healthCtx.arc(point.x, point.y, 20, 0, 2 * Math.PI)
                healthCtx.fill()
            }
        }
    }

    const initShieldSprite = () => {
        if (!shieldSprite.current) {
            shieldSprite.current = document.createElement('canvas')
            shieldSprite.current.width = 42
            shieldSprite.current.height = 42
            const shieldCtx = shieldSprite.current.getContext('2d')
            if (shieldCtx) {
                const point: TCoord = {
                    x: 21,
                    y: 21,
                }
                shieldCtx.strokeStyle = `rgb(0, 188, 212)`
                shieldCtx.beginPath()
                shieldCtx.arc(point.x, point.y, 20, 0, 2 * Math.PI)
                shieldCtx.stroke()

                shieldCtx.fillStyle = `rgb(0, 188, 212)`
                shieldCtx.beginPath()
                shieldCtx.moveTo(point.x, point.y - 14)
                shieldCtx.lineTo(point.x + 14, point.y - 8)
                shieldCtx.lineTo(point.x + 12, point.y + 2)
                shieldCtx.bezierCurveTo(point.x + 10, point.y + 8, point.x + 10, point.y + 8, point.x, point.y + 14)
                shieldCtx.bezierCurveTo(point.x - 10, point.y + 8, point.x - 10, point.y + 8, point.x - 12, point.y + 2)
                shieldCtx.lineTo(point.x - 14, point.y - 8)
                shieldCtx.lineTo(point.x, point.y - 14)
                shieldCtx.fill()

                shieldCtx.fillStyle = `rgba(0, 188, 212, 0.3)`
                shieldCtx.beginPath()
                shieldCtx.arc(point.x, point.y, 20, 0, 2 * Math.PI)
                shieldCtx.fill()
            }
        }
    }

    const initLiveSprite = () => {
        if (!liveSprite.current) {
            liveSprite.current = document.createElement('canvas')
            liveSprite.current.width = 30
            liveSprite.current.height = 30
            const liveCtx = liveSprite.current.getContext('2d')
            const coord: TCoord = {
                x: 25,
                y: 0,
            }
            if (liveCtx) {
                liveCtx.beginPath()
                liveCtx.fillStyle = Colors.red.A400
                liveCtx.moveTo(coord.x - 10, coord.y + 5)
                liveCtx.bezierCurveTo(coord.x - 7.5, coord.y - 5, coord.x + 15, coord.y + 5, coord.x - 10, coord.y + 20)
                liveCtx.bezierCurveTo(coord.x - 35, coord.y + 5, coord.x - 12.5, coord.y - 5, coord.x - 10, coord.y + 5)
                liveCtx.fill()
            }
        }
    }

    const initStarSprite = () => {
        if (!starSprite.current) {
            starSprite.current = document.createElement('canvas')
            starSprite.current.width = starSize.current
            starSprite.current.height = starSize.current
            const starCtx = starSprite.current.getContext('2d')
            const bigPoints = []
            for (let i = 0; i <= 5; i++) {
                bigPoints.push({
                    x: rand(0, starSize.current),
                    y: rand(0, starSize.current),
                })
            }
            const points = []
            for (let i = 0; i <= 20; i++) {
                points.push({
                    x: rand(0, starSize.current),
                    y: rand(0, starSize.current),
                })
            }
            if (starCtx) {
                starCtx.fillStyle = starColors[0]
                bigPoints.forEach((point) => {
                    starCtx.beginPath()
                    starCtx.arc(point.x, point.y, 2, 0, 2 * Math.PI)
                    starCtx.fill()
                })
                starCtx.fillStyle = starColors[3]
                points.forEach((point) => {
                    starCtx.beginPath()
                    starCtx.arc(point.x, point.y, 1, 0, 2 * Math.PI)
                    starCtx.fill()
                })
            }
        }
    }

    const initStonesSprite = () => {
        for (let i = 0; i <= STONE_COUNT; i++) {
            stoneShell.current.push(initStoneSprite(stoneSize.current))
        }
    }

    const initRocketSprite = () => {
        if (!rocketSprite.current) {
            rocketSprite.current = document.createElement('canvas')
            rocketSprite.current.width = rocketSize.current + (ROCKET_RADIUS + 1) * 2
            rocketSprite.current.height = rocketSize.current + (ROCKET_RADIUS + 1) * 2
            const rocketCtx = rocketSprite.current.getContext('2d')

            if (rocketCtx) {
                rocketCtx.fillStyle = Colors.lightBlue[500]
                rocketCtx.translate(ROCKET_RADIUS + 1, ROCKET_RADIUS + 1)
                rocketCtx.beginPath()
                rocketCtx.arc(rocketSize.current * 0.5, 0, ROCKET_RADIUS, 0, 2 * Math.PI)
                rocketCtx.fill()
                rocketCtx.beginPath()
                rocketCtx.arc(0, rocketSize.current, ROCKET_RADIUS, 0, 2 * Math.PI)
                rocketCtx.fill()
                rocketCtx.beginPath()
                rocketCtx.arc(rocketSize.current * 0.5, rocketSize.current * 0.75, ROCKET_RADIUS, 0, 2 * Math.PI)
                rocketCtx.fill()
                rocketCtx.beginPath()
                rocketCtx.arc(rocketSize.current, rocketSize.current, ROCKET_RADIUS, 0, 2 * Math.PI)
                rocketCtx.fill()

                rocketCtx.strokeStyle = Colors.lightBlue[500]
                rocketCtx.beginPath()
                rocketCtx.moveTo(rocketSize.current * 0.5, 0)
                rocketCtx.lineTo(0, rocketSize.current)
                rocketCtx.lineTo(rocketSize.current * 0.5, rocketSize.current * 0.75)
                rocketCtx.lineTo(rocketSize.current, rocketSize.current)
                rocketCtx.lineTo(rocketSize.current * 0.5, 0)
                rocketCtx.lineWidth = 1
                rocketCtx.stroke()

                rocketCtx.fillStyle = 'rgba(3, 168, 244, 0.1)'
                rocketCtx.beginPath()
                rocketCtx.moveTo(rocketSize.current * 0.5, 0)
                rocketCtx.lineTo(0, rocketSize.current)
                rocketCtx.lineTo(rocketSize.current * 0.5, rocketSize.current * 0.75)
                rocketCtx.lineTo(rocketSize.current, rocketSize.current)
                rocketCtx.lineTo(rocketSize.current * 0.5, 0)
                rocketCtx.fill()
            }
        }
    }

    const initPlanet = () => {
        if (center.current && planetData) {
            planet.current = {
                ...planetData,
                angle: 0,
                center: {
                    x: center.current.x + 200,
                    y: center.current.y - planetData.start,
                },
                visible: false,
                radius: planetData.start,
            }
        }
    }

    useEffect(() => {
        if (center.current && planetData) {
            initPlanet()
            const image = new Image()
            image.src = `/assets${planetData.img}`
            image.onload = () => {
                planetImage.current = image
            }
        }
    }, [planetData, center])

    const initFromPlanet = () => {
        if (center.current && fromPlanetData) {
            fromPlanet.current = {
                ...fromPlanetData,
                angle: 0,
                center: {
                    x: center.current.x,
                    y: center.current.y + planetSize.current * 0.2,
                },
                visible: true,
                radius: 0,
            }
        }
    }

    useEffect(() => {
        if (center.current && fromPlanetData) {
            initFromPlanet()
            const image = new Image()
            image.src = `/assets${fromPlanetData.img}`
            image.onload = () => {
                fromPlanetImage.current = image
            }
        }
    }, [fromPlanetData, center])

    const newRocketPosition = () => {
        rocket.current = {
            up: {
                x: center.current.x,
                y: center.current.y,
            },
            left: {
                x: center.current.x - rocketSize.current / 2,
                y: center.current.y + rocketSize.current,
            },
            right: {
                x: center.current.x + rocketSize.current / 2,
                y: center.current.y + rocketSize.current,
            },
            center: {
                x: center.current.x,
                y: center.current.y + rocketSize.current * 0.75,
            },
            visible: 0,
            shield: 0,
            fullShield: 0,
        }
    }

    const resizeVisible = () => {
        if (visibleStoneCoord.current) {
            visibleStoneCoord.current = reAngleVisible(center.current, visibleStoneCoord.current, spaceAngle.current)
        }

        if (visiblePlanetCoord.current) {
            visiblePlanetCoord.current = reAngleVisible(center.current, visiblePlanetCoord.current, spaceAngle.current)
        }

        if (visiblePlanetWayCoord.current) {
            visiblePlanetWayCoord.current = reAngleVisible(
                center.current,
                visiblePlanetWayCoord.current,
                spaceAngle.current
            )
        }
    }

    const moveAngle = (angle: number, need_draw = true) => {
        spaceAngle.current += angle

        if (spaceAngle.current > doublePi) {
            spaceAngle.current = spaceAngle.current % doublePi
        }
        if (spaceAngle.current < 0) {
            spaceAngle.current += doublePi
        }

        speedAngle.current = {
            y: speed.current * Math.cos(spaceAngle.current),
            x: speed.current * Math.sin(spaceAngle.current),
        }
        resizeVisible()

        need_draw && draw()
    }

    const move = () => {
        if (center.current) {
            new_tick_time.current = new Date().getTime()
            current_tick.current = !inGame.current ? 1 : new_tick_time.current - tick_time.current
            currentStoneSpeed.current = {
                x: !inGame.current ? -0.1 : speedAngle.current.x * current_tick.current,
                y: !inGame.current ? -0.05 : speedAngle.current.y * current_tick.current,
            }
            currentStarSpeed.current = {
                x: !inGame.current ? 0.05 : currentStoneSpeed.current.x * 0.5,
                y: !inGame.current ? 0.1 : currentStoneSpeed.current.y * 0.5,
            }
            tick_time.current = new_tick_time.current

            starsModify()
            stonesModify()

            if (!inGame.current || !planet.current) {
                if (fromPlanet.current) {
                    fromPlanet.current.angle += 0.001
                }
            } else {
                rocket.current = rocketModify(rocket.current)
                helpModify()
                moveFromPlanet()
                movePlanet()
                crashCheck()
            }
        }
        biasMove()

        draw()

        if (status.current !== ESpaceStatus.PAUSE) {
            setTimeout(() => {
                move()
            }, 1)
            // window.requestAnimationFrame(move)
        }
    }

    const biasMove = () => {
        if (bias.current && bias.current > 0) {
            bias.current -= 1
        } else if (bias.current === 0) {
            bias.current = undefined
        }
    }

    const crashCheck = () => {
        let crash = false
        if (!rocket.current.shield) {
            stones.current
                .filter((stone) => stone.active && stone.visible)
                .forEach((stone) => {
                    if (crash) return
                    crash = crashStone(stoneShell.current[stone.index], stone, center.current, stoneCrashSize.current)
                })
        }

        if (crash) {
            if ('vibrate' in navigator) {
                navigator.vibrate(200)
            }
            rocket.current.shield += 3000
            rocket.current.fullShield = rocket.current.shield
            lives.current--
            bias.current = biasPoints.length - 1
        }

        if (inGame.current && lives.current <= 0) {
            speed.current = 0
            inGame.current = false
            endSuccessGame(points.current, fromPlanet.current?.id || '0')
            setCrashMess(badEnds[rand(0, badEnds.length - 1)])
            setOpenCrash(true)
        }
    }

    const getPoints = () => {
        if (!planet.current) return

        let newPoints = points.current

        if (moveLock.current) {
            if (newPoints < planet.current.fullPoints) {
                newPoints++
            }
        } else {
            newPoints = Math.floor((planet.current.start - planet.current.radius) * planet.current.coefficient)
        }

        if (newPoints > planet.current.fullPoints) {
            newPoints = planet.current.fullPoints
        }

        if (newPoints > points.current) {
            points.current = newPoints
            if (refPoint.current) {
                refPoint.current.textContent = newPoints + ''
            }
        }
    }

    const starsModify = () => {
        stars.current.map((star) =>
            moveStar(star, center.current, currentStarSpeed.current, spaceRadius.current, visibleStoneCoord.current)
        )
    }

    const stonesModify = () => {
        stones.current.map((stone) =>
            moveStone(
                stone,
                current_tick.current,
                center.current,
                currentStoneSpeed.current,
                spaceRadius.current,
                visibleStoneCoord.current,
                lockReset.current
            )
        )
    }

    const helpModify = () => {
        health.current = moveHelp(health.current)
        shield.current = moveHelp(shield.current)
        crashHealth()
        crashShield()
    }

    const crashHealth = () => {
        if (!!center.current && !!health.current.visible) {
            const radius = getRadius(center.current, health.current.coord)
            if (radius < 20) {
                lives.current++
                bias.current = 1
                health.current = reInitHelp()
            }
        }
    }

    const crashShield = () => {
        if (!!center.current && !!shield.current.visible) {
            const radius = getRadius(center.current, shield.current.coord)
            if (radius < 20) {
                rocket.current.shield += 5000
                rocket.current.fullShield = rocket.current.shield
                bias.current = 1
                shield.current = reInitHelp()
            }
        }
    }

    const moveHelp = (help: IHelp) => {
        help.coord.x += currentStoneSpeed.current.x
        help.coord.y += currentStoneSpeed.current.y
        if (!!spaceRadius.current && !!visibleStoneCoord.current) {
            if (
                help.coord.x < visibleStoneCoord.current.min.x ||
                help.coord.x > visibleStoneCoord.current.max.x ||
                help.coord.y < visibleStoneCoord.current.min.y ||
                help.coord.y > visibleStoneCoord.current.max.y
            ) {
                if (help.coord.y < center.current.y - spaceRadius.current) {
                    help.coord.y = center.current.y + spaceRadius.current
                    help.coord.x = center.current.x + center.current.x - help.coord.x
                } else if (help.coord.y > center.current.y + spaceRadius.current) {
                    help.coord.y = center.current.y - spaceRadius.current
                    help.coord.x = center.current.x + center.current.x - help.coord.x
                } else if (help.coord.x < center.current.x - spaceRadius.current) {
                    help.coord.x = center.current.x + spaceRadius.current
                    help.coord.y = center.current.y + center.current.y - help.coord.y
                } else if (help.coord.x > center.current.x + spaceRadius.current) {
                    help.coord.x = center.current.x - spaceRadius.current
                    help.coord.y = center.current.y + center.current.y - help.coord.y
                }
                help.visible = false
            } else if (!isPointInside(help.coord, visibleStoneCoord.current.lines)) {
                help.visible = false
            } else {
                help.visible = true
            }
        }
        return help
    }

    const reInitHelp = () => {
        const randAngle = rand(Math.PI * 1.25, Math.PI * 1.75, 1000, 0.001)
        const coord = getNewInitCoord(center.current, doubleSpaceRadius.current, randAngle - spaceAngle.current)
        return {
            coord,
            visible: false,
        }
    }

    const speedModify = () => {
        if (speed.current && moveLock.current && planet.current) {
            if (speed.current < 0.1 || planet.current.radius < 50) {
                speed.current = 0
                inGame.current = false
                setPlanetModal(planet.current)
                endSuccessGame(points.current, planet.current.id)
                finishRound()
            } else if (speed.current > 0) {
                speed.current -= 0.000015 * current_tick.current
            }
        } else if (inGame.current) {
            speed.current += 0.0000006 * current_tick.current
        }
        speedAngle.current = {
            y: speed.current * Math.cos(spaceAngle.current),
            x: speed.current * Math.sin(spaceAngle.current),
        }
    }

    const moveFromPlanet = () => {
        if (fromPlanet.current && visiblePlanetCoord.current && fromPlanet.current.visible) {
            fromPlanet.current.center.x += currentStoneSpeed.current.x
            fromPlanet.current.center.y += currentStoneSpeed.current.y

            if (
                fromPlanet.current.center.x < visiblePlanetCoord.current.min.x ||
                fromPlanet.current.center.x > visiblePlanetCoord.current.max.x ||
                fromPlanet.current.center.y < visiblePlanetCoord.current.min.y ||
                fromPlanet.current.center.y > visiblePlanetCoord.current.max.y
            ) {
                fromPlanet.current.visible = false
            }
        }
    }

    const movePlanet = () => {
        if (planet.current && visiblePlanetCoord.current) {
            planet.current.center.x += currentStoneSpeed.current.x
            planet.current.center.y += currentStoneSpeed.current.y

            const radius = getRadius(center.current, planet.current.center)
            if (radius <= planet.current.radius) {
                planet.current.radius = radius
                lockReset.current = radius < lockResetSize.current
                moveLock.current = radius < moveLockSize.current

                getPoints()
                speedModify()

                if (
                    planet.current.center.x < visiblePlanetCoord.current.min.x ||
                    planet.current.center.x > visiblePlanetCoord.current.max.x ||
                    planet.current.center.y < visiblePlanetCoord.current.min.y ||
                    planet.current.center.y > visiblePlanetCoord.current.max.y
                ) {
                    planet.current.visible = false
                } else if (!isPointInside(planet.current.center, visiblePlanetCoord.current.lines)) {
                    planet.current.visible = false
                } else {
                    planet.current.visible = true
                }
            } else {
                planet.current.center.x -= currentStoneSpeed.current.x
                planet.current.center.y -= currentStoneSpeed.current.y
            }

            planet.current.angle = getAngle(center.current, planet.current.center) + spaceAngle.current
            if (planet.current.angle > Math.PI * 2) {
                planet.current.angle = planet.current.angle % (Math.PI * 2)
            } else if (planet.current.angle < 0) {
                planet.current.angle += Math.PI * 2
            }
        }
    }

    const rocketModify = (rocket: IRocket) => {
        if (!inGame.current) {
            rocket.visible = 0
            return rocket
        }
        if (rocket.visible <= 0) {
            rocket.visible = 200
            rocket.shield = rocket.shield > 0 ? rocket.shield - current_tick.current : 0
            return rocket
        }

        rocket.visible = rocket.visible - current_tick.current
        rocket.shield = rocket.shield > 0 ? rocket.shield - current_tick.current : 0
        return rocket
    }

    const draw = () => {
        if (ctx.current && center.current) {
            if (bias.current !== undefined && bias.current >= 0) {
                ctx.current.clearRect(0, 0, width.current, height.current)
                ctx.current.translate(biasPoints[bias.current || 0].x, biasPoints[bias.current || 0].y)
            }

            ctx.current.fillStyle = Colors.blueGrey[900]
            ctx.current.fillRect(0, 0, width.current, height.current)

            ctx.current.translate(center.current.x, center.current.y)
            ctx.current.rotate(spaceAngle.current)
            ctx.current.translate(-center.current.x, -center.current.y)

            drawStars()
            drawPlanets()
            drawStones()
            drawHelps()

            ctx.current.translate(center.current.x, center.current.y)
            ctx.current.rotate(-spaceAngle.current)
            ctx.current.translate(-center.current.x, -center.current.y)

            if (bias.current !== undefined && bias.current >= 0) {
                ctx.current.translate(-biasPoints[bias.current || 0].x, -biasPoints[bias.current || 0].y)
            }

            rocketSprite.current &&
                drawRocket({
                    ctx: ctx.current,
                    sprite: rocketSprite.current,
                    center: center.current,
                    rocket: rocket.current,
                    rocketSize: rocketSize.current,
                    deltaRocketPosition: deltaRocketPosition.current,
                    rocketRadius: ROCKET_RADIUS + 1,
                })

            status.current !== ESpaceStatus.INIT &&
                liveSprite.current &&
                drawLives({
                    ctx: ctx.current,
                    lives: lives.current,
                    width: width.current,
                    sprite: liveSprite.current,
                })

            needAngle()
        }
    }

    const drawPlanets = () => {
        status.current !== ESpaceStatus.INIT &&
            ctx.current &&
            planet.current &&
            planet.current.visible &&
            drawPlanet({
                ctx: ctx.current,
                planet: planet.current,
                planetSize: planetSize.current,
                halfPlanetSize: halfPlanetSize.current,
                planetImage: planetImage.current,
            })
        fromPlanet.current &&
            ctx.current &&
            fromPlanet.current.visible &&
            fromPlanetImage.current &&
            drawFromPlanet({
                ctx: ctx.current,
                planet: fromPlanet.current,
                planetSize: planetSize.current,
                halfPlanetSize: halfPlanetSize.current,
                fromPlanetImage: fromPlanetImage.current,
            })
        status.current !== ESpaceStatus.INIT &&
            visiblePlanetWayCoord.current &&
            waySprite.current &&
            planet.current &&
            ctx.current &&
            drawWay({
                ctx: ctx.current,
                planet: planet.current,
                center: center.current,
                visibleSpace: visiblePlanetWayCoord.current,
                sprite: waySprite.current,
            })
    }

    const drawHelps = () => {
        if (!!ctx.current && status.current !== ESpaceStatus.INIT) {
            shield.current.visible &&
                !!shieldSprite.current &&
                drawHelp({
                    ctx: ctx.current,
                    point: shield.current.coord,
                    sprite: shieldSprite.current,
                })
            health.current.visible &&
                !!healthSprite.current &&
                drawHelp({
                    ctx: ctx.current,
                    point: health.current.coord,
                    sprite: healthSprite.current,
                })
        }
    }

    const drawStars = () => {
        if (ctx.current) {
            stars.current.forEach((star) => {
                if (ctx.current && starSprite.current) {
                    drawStar(ctx.current, star, starSprite.current, halfStarSize.current)
                }
            })
        }
    }

    const drawStones = () => {
        if (ctx.current) {
            stones.current.forEach((stone) => {
                if (ctx.current && starSprite.current && stone.active && stone.visible) {
                    drawStone(ctx.current, stone, stoneShell.current[stone.index].sprite, deltaStoneSize.current)
                }
            })
        }
    }

    const needAngle = () => {
        if (inGame.current && moveLock.current && planet.current) {
            if (Math.abs(Math.PI * 1.5 - planet.current.angle) > 0.005) {
                if (Math.PI * 1.5 - planet.current.angle < 0) {
                    moveAngle(-0.005, false)
                } else {
                    moveAngle(0.005, false)
                }
            }
        }
    }

    const handleReset = () => {
        bias.current = undefined
        speed.current = 0
        inGame.current = false
        points.current = 0
        rocket.current.shield = 0
        rocket.current.visible = 0
        spaceAngle.current = 0
        speedAngle.current = {
            x: 0,
            y: 0,
        }
        resizeVisible()
        initPlanet()
        initFromPlanet()

        visibleStoneCoord.current = InitVisible(
            center.current,
            { x: -doubleStoneSize.current, y: -doubleStoneSize.current },
            { x: width.current + doubleStoneSize.current, y: height.current + doubleStoneSize.current }
        )

        visiblePlanetCoord.current = InitVisible(
            center.current,
            { x: -planetSize.current, y: -planetSize.current },
            { x: width.current + planetSize.current, y: height.current + planetSize.current }
        )

        visiblePlanetWayCoord.current = InitVisible(
            center.current,
            { x: 0, y: 0 },
            { x: width.current, y: height.current }
        )
        // GameInit()
    }

    const handleContinue = () => {
        handleReset()
        handleGameStart()
    }

    const handleMenu = () => {
        setOpenSuccess(false)
        setOpenCrash(false)
        handleReset()
        if (status.current === ESpaceStatus.PAUSE) {
            status.current = ESpaceStatus.INIT
            setStatus(ESpaceStatus.INIT)
            tick_time.current = new Date().getTime()
            console.log('menu(1)')
            move()
        }
        status.current = ESpaceStatus.INIT
        setStatus(ESpaceStatus.INIT)
    }

    const handleGamePause = () => {
        if (status.current === ESpaceStatus.GAME && inGame.current) {
            status.current = ESpaceStatus.PAUSE
            setStatus(ESpaceStatus.PAUSE)
        }
    }

    const handleGameContinue = () => {
        status.current = ESpaceStatus.GAME
        setStatus(ESpaceStatus.GAME)
        tick_time.current = new Date().getTime()
        console.log('menu(2)')
        move()
    }

    const handleGameStart = () => {
        setOpenSuccess(false)
        setOpenCrash(false)
        status.current = ESpaceStatus.GAME
        setStatus(ESpaceStatus.GAME)
        stones.current.map((stone) => {
            stone.active = true
            return stone
        })
        rocket.current.shield = 3000
        rocket.current.fullShield = rocket.current.shield
        bias.current = undefined
        inGame.current = true
        moveLock.current = false
        lives.current = 3
        points.current = 0
        spaceAngle.current = 0
        speed.current = 0.2
        speedAngle.current = {
            x: 0,
            y: 0.2,
        }
        resizeVisible()
    }

    const endSuccessGame = (points: number, planet_id: string) => {
        request('games/setPlanet', {
            method: 'POST',
            data: {
                points,
                planet_id,
            },
        }).then((response: IGameResponse) => {
            setGame(response.data)
            setPlanet(response.planet)
            setFromPlanet(response.from || undefined)
        })
    }

    const finishRound = () => {
        setOpenSuccess(true)
    }

    const getGame = () => {
        request('games/planet').then((response: IGameResponse) => {
            setGame(response.data)
            setPlanet(response.planet)
            setFromPlanet(response.from || undefined)
            if (!response.from) {
                initFromPlanet()
            }
        })
    }

    const eventStart = useCallback((e: MouseEvent) => {
        if (status.current === ESpaceStatus.GAME) {
            startMove.current = {
                x: e.x,
                y: e.y,
            }
        }
    }, [])

    const eventMove = useCallback((e: MouseEvent) => {
        if (!!startMove.current && !!center.current && status.current === ESpaceStatus.GAME) {
            let deltaY = Math.abs(center.current.y - startMove.current.y)
            if (deltaY < 20) {
                deltaY = 20
            }

            const angle = Math.atan((e.x - startMove.current.x) / deltaY)

            angle && !moveLock.current && moveAngle(angle)

            startMove.current = {
                x: e.x,
                y: e.y,
            }
        }
    }, [])

    const eventTouchStart = useCallback((e: TouchEvent) => {
        if (status.current === ESpaceStatus.GAME) {
            startMove.current = {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY,
            }
        }
    }, [])

    const eventTouchMove = useCallback((e: TouchEvent) => {
        if (!!startMove.current && !!center.current && status.current === ESpaceStatus.GAME) {
            let deltaY = Math.abs(center.current.y - startMove.current.y)
            if (deltaY < 20) {
                deltaY = 20
            }
            const angle = Math.atan((e.touches[0].pageX - startMove.current.x) / deltaY)

            angle && !moveLock.current && moveAngle(angle)

            startMove.current = {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY,
            }
        }
    }, [])

    const eventEnd = () => {
        startMove.current = undefined
    }

    useEffect(() => {
        window.addEventListener('blur', handleGamePause)
        document.addEventListener('mousedown', eventStart)
        document.addEventListener('mousemove', eventMove)
        document.addEventListener('mouseup', eventEnd)
        document.addEventListener('touchstart', eventTouchStart)
        document.addEventListener('touchend', eventEnd)
        document.addEventListener('touchcancel', eventEnd)
        document.addEventListener('touchmove', eventTouchMove)
        return () => {
            window.removeEventListener('blur', handleGamePause)
            document.removeEventListener('mousedown', eventStart)
            document.removeEventListener('mousemove', eventMove)
            document.removeEventListener('mouseup', eventEnd)
            document.removeEventListener('touchstart', eventTouchStart)
            document.removeEventListener('touchend', eventEnd)
            document.removeEventListener('touchcancel', eventEnd)
            document.removeEventListener('touchmove', eventTouchMove)
        }
    }, [])

    const scrollLock = () => {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop

        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.top = '-' + scrollPosition + 'px'
        document.body.style.left = '0'
        document.body.style.width = '100%'
    }

    const scrollUnlock = () => {
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.width = ''
    }

    useEffect(() => {
        scrollLock()
        return () => {
            scrollUnlock()
        }
    }, [])

    return (
        <Box
            sx={{
                width: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                bgcolor: Colors.blueGrey[900],
                overflow: 'hidden',
                userSelect: 'none',
            }}
        >
            <canvas ref={ref} width={widthState} height={heightState} />

            {(statusState === ESpaceStatus.GAME || statusState === ESpaceStatus.PAUSE) && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        zIndex: 100,
                    }}
                >
                    <Typography variant="h4" color="white" ref={refPoint} />
                </Box>
            )}

            {statusState === ESpaceStatus.INIT && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        zIndex: 100,
                    }}
                >
                    <Typography variant="h4" color="white">
                        Рекорд: {game?.best}
                    </Typography>
                </Box>
            )}

            {statusState === ESpaceStatus.PAUSE && (
                <Box
                    sx={{
                        display: 'flex',
                        position: 'absolute',
                        p: 4,
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: 4,
                        zIndex: 100,
                    }}
                >
                    <Button
                        fullWidth
                        disabled={!planet.current}
                        size="large"
                        variant="contained"
                        color="info"
                        sx={{ maxWidth: '500px' }}
                        onClick={handleGameContinue}
                    >
                        Продолжить
                    </Button>
                    <Button fullWidth variant="contained" color="info" sx={{ maxWidth: '500px' }} onClick={handleMenu}>
                        Меню
                    </Button>
                </Box>
            )}

            {statusState === ESpaceStatus.GAME && (
                <IconButton
                    aria-label="sound"
                    sx={{
                        position: 'absolute',
                        top: 5,
                        left: 5,
                        zIndex: 100,
                    }}
                    onClick={handleGamePause}
                >
                    <PauseCircleOutlineIcon sx={{ color: Colors.blueGrey[50] }} />
                </IconButton>
            )}

            {statusState === ESpaceStatus.INIT && (
                <>
                    <IconButton
                        aria-label="sound"
                        sx={{
                            position: 'absolute',
                            top: 5,
                            left: 5,
                            zIndex: 101,
                        }}
                        onClick={() => setResultsOpen(true)}
                    >
                        <FormatListNumberedIcon sx={{ color: Colors.blueGrey[50] }} />
                    </IconButton>

                    <IconButton
                        aria-label="sound"
                        sx={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            zIndex: 101,
                        }}
                        onClick={() => history.push('/game')}
                    >
                        <LogoutIcon sx={{ color: Colors.blueGrey[50] }} />
                    </IconButton>

                    <Box
                        sx={{
                            display: 'flex',
                            position: 'absolute',
                            p: 4,
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            flexDirection: 'column',
                            gap: 4,
                            zIndex: 100,
                        }}
                    >
                        <Button
                            fullWidth
                            disabled={!game}
                            size="large"
                            variant="contained"
                            color="info"
                            sx={{ maxWidth: '500px' }}
                            onClick={handleGameStart}
                        >
                            Играть
                        </Button>
                    </Box>
                </>
            )}

            <Dialog fullScreen open={openSuccess}>
                <Box
                    sx={{
                        width: '100%',
                        bgcolor: Colors.blueGrey[700],
                        display: 'flex',
                        p: 4,
                        flexDirection: 'column',
                        gap: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 'auto',
                    }}
                >
                    <Typography variant="h4" color="white">
                        Вы достигли {planetModal?.finish_name}!
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Typography variant="body1" color="white">
                            Очков заработано:
                        </Typography>

                        <Typography variant="h5" color={Colors.yellow[700]}>
                            {points.current}
                        </Typography>
                    </Box>

                    <Typography variant="body1" color="white" sx={{ textAlign: 'center' }}>
                        {planetModal?.description}
                    </Typography>

                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        color="info"
                        sx={{ maxWidth: '500px' }}
                        onClick={handleContinue}
                    >
                        Продолжить
                    </Button>
                </Box>
            </Dialog>

            <Dialog fullScreen open={openCrash}>
                <Box
                    sx={{
                        width: '100%',
                        bgcolor: Colors.blueGrey[700],
                        display: 'flex',
                        p: 4,
                        flexDirection: 'column',
                        gap: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 'auto',
                    }}
                >
                    <Typography variant="h4" color="white">
                        {game && points.current >= game?.best ? 'Новый рекорд!' : 'Потрачено'}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Typography variant="body1" color="white">
                            Очков заработано:
                        </Typography>

                        <Typography variant="h5" color={Colors.yellow[700]}>
                            {points.current}
                        </Typography>
                    </Box>

                    <Typography variant="body1" color="white" sx={{ textAlign: 'center' }}>
                        {game && points.current >= game?.best
                            ? 'Я так вами горжусь, что не передать словами! Мы навсегда запомним 272 байта о вас ♥'
                            : crashMess}
                    </Typography>

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Button
                            fullWidth
                            size="large"
                            variant="contained"
                            color="info"
                            sx={{ maxWidth: '500px' }}
                            onClick={handleContinue}
                        >
                            Еще раз
                        </Button>

                        <Button
                            fullWidth
                            size="medium"
                            variant="contained"
                            color="info"
                            sx={{ maxWidth: '500px' }}
                            onClick={handleMenu}
                        >
                            Меню
                        </Button>
                    </Box>
                </Box>
            </Dialog>

            <Results isOpen={isResultsOpen} handleClose={() => setResultsOpen(false)} />
        </Box>
    )
}
