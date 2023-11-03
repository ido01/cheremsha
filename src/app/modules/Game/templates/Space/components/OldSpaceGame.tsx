// import {
//     PauseCircleOutline as PauseCircleOutlineIcon,
//     VolumeOff as VolumeOffIcon,
//     VolumeUp as VolumeUpIcon,
// } from '@mui/icons-material'
// import { Box, Button, Dialog, IconButton, Typography } from '@mui/material'
// import * as Colors from '@mui/material/colors'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
// import { IGame } from 'types/IGame'
// import useSound from 'use-sound'
// import { rand } from 'utils/rand'
// import { request } from 'utils/request'

// import {
//     ESpaceStatus,
//     IGameResponse,
//     IPlanet,
//     IPlanetResponse,
//     IRocket,
//     ISpaceSize,
//     IStar,
//     IStone,
//     TCoord,
// } from '../types/Space'
// import { getNewCoord, getRadius } from '../utils/angle'
// import {
//     drawFromPlanet,
//     drawHealth,
//     drawLives,
//     drawPlanet,
//     drawRocket,
//     drawShield,
//     drawStar,
//     drawStone,
// } from '../utils/canvas'
// import { InitStone } from '../utils/stone'
// import { Results } from './Results'

// const biasPoints: TCoord[] = [
//     {
//         x: 20,
//         y: 0,
//     },
//     {
//         x: 20,
//         y: 10,
//     },
//     {
//         x: 10,
//         y: 10,
//     },
//     {
//         x: 10,
//         y: -20,
//     },
//     {
//         x: 0,
//         y: -20,
//     },
//     {
//         x: -10,
//         y: 0,
//     },
//     {
//         x: -20,
//         y: 0,
//     },
//     {
//         x: -20,
//         y: 10,
//     },
// ]

// const badEnds: string[] = [
//     'Отличная попытка, но в следующий раз старайтесь',
//     'Как говорил мой отец: "Отстань, я новости смотрю". Мне тогда не помогло, может вам поможет',
//     'Астрологи говорят, что у тебя все получится! Астрономы говорят: "Бдыщ"',
//     'Да, результат не лучший, но как круто ты облетел двенадцатый Астероид - это просто пушка',
//     'Тебе слабо попробовать еще раз',
//     'Первый блин комом, хватит делать первые блины!',
//     'Встречаются как-то Американец, Немец и Русский. И все трое сошлись на том, что твой результат так себе',
//     'Тебе надо отдохнуть, например ты можешь поиграть в эту игру',
//     'Когда-то я подавал большие надежды. Ходили слухи, что я буду хранить научные работы. Но теперь я тут и должен хранить твой скверный результат. Тебе следует постараться для меня',
// ]

// const starColors: string[] = [Colors.yellow[50], Colors.yellow[100], Colors.yellow[200]]
export const SpaceGame: React.FC = () => {
    return <></>
}

// export const SpaceGame: React.FC = () => {
//     const ref = useRef<HTMLCanvasElement>(null)
//     const VISIBLE_PADDING = 10
//     const TICK = 10
//     const DEFAULT_SPEED = 0.05
//     const ROCKET_RADIUS = 3
//     const ROCKET_PADDING = 30

//     // Overlay block
//     const ctx = useRef<CanvasRenderingContext2D | null>(null)
//     const width = useRef<number>(0)
//     const height = useRef<number>(0)
//     const starCount = useRef<number>(0)
//     const stoneCount = useRef<number>(0)
//     const [widthState, setWidth] = useState<number>(0)
//     const [heightState, setHeight] = useState<number>(0)
//     const spaceRadius = useRef<number>(0)
//     const rocketSize = useRef<number>(0)
//     const fullSize = useRef<number>(0)
//     const lockResetSize = useRef<number>(0)
//     const moveLockSize = useRef<number>(0)
//     const spaceCoord = useRef<ISpaceSize>()
//     const stoneSize = useRef<number>(0)
//     const doubleStoneSize = useRef<number>(0)
//     const stoneCrashSize = useRef<number>(0)
//     // const [startMove, setStartMove] = useState<TCoord>()
//     const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
//     const startMove = useRef<TCoord>()
//     const center = useRef<TCoord>({
//         x: 0,
//         y: 0,
//     })

//     // New Game
//     const inGame = useRef<boolean>(false)
//     const points = useRef<number>(0)
//     const [pointsState, setPoints] = useState<number>(0)
//     const speed = useRef<number>(0)
//     const starSpeed = useRef<number>(0)
//     const lives = useRef<number>(3)
//     const moveLock = useRef<boolean>(true)
//     const lockReset = useRef<boolean>(false)
//     const bias = useRef<number>()
//     const stars = useRef<IStar[]>([])
//     const stones = useRef<IStone[]>([])
//     const planet = useRef<IPlanet>()
//     const fromPlanet = useRef<IPlanet>()
//     const health = useRef<TCoord>({
//         x: 0,
//         y: 0,
//     })
//     const shield = useRef<TCoord>({
//         x: 0,
//         y: 0,
//     })
//     const rocket = useRef<IRocket>({
//         up: {
//             x: 0,
//             y: 0,
//         },
//         left: {
//             x: 0,
//             y: 0,
//         },
//         right: {
//             x: 0,
//             y: 0,
//         },
//         center: {
//             x: 0,
//             y: 0,
//         },
//         visible: 0,
//         shield: 0,
//     })

//     // Game
//     const planetImage = useRef<HTMLImageElement>()
//     const fromPlanetImage = useRef<HTMLImageElement>()
//     const status = useRef<ESpaceStatus>(ESpaceStatus.INIT)
//     const [statusState, setStatus] = useState<ESpaceStatus>(ESpaceStatus.INIT)
//     const [openSuccess, setOpenSuccess] = useState<boolean>(false)
//     const [openCrash, setOpenCrash] = useState<boolean>(false)
//     const [crashMess, setCrashMess] = useState<string>('')
//     const [game, setGame] = useState<IGame>()
//     const [planetData, setPlanet] = useState<IPlanetResponse>()
//     const [planetModal, setPlanetModal] = useState<IPlanetResponse>()
//     const [fromPlanetData, setFromPlanet] = useState<IPlanetResponse>()
//     const [isSoundOn, setSoundOn] = useState<boolean>(false)
//     const [isResultsOpen, setResultsOpen] = useState<boolean>(false)

//     const [playMain, { stop: stopMain }] = useSound('/space/main.mp3', {
//         volume: 0.25,
//         loop: true,
//     })
//     const [playGame, { stop: stopGame }] = useSound('/space/game.mp3', { volume: 0.25, loop: true })

//     useLayoutEffect(() => {
//         function updateSize() {
//             let calcSize = 0
//             let actualSize = 0
//             let nSpaceRadius = 0
//             width.current = document.body.clientWidth
//             setWidth(document.body.clientWidth)
//             height.current = window.innerHeight
//             setHeight(window.innerHeight)
//             if (document.body.clientWidth > window.innerHeight) {
//                 calcSize = document.body.clientWidth * 3
//                 nSpaceRadius = document.body.clientWidth * 1.5
//                 actualSize = document.body.clientWidth
//             } else {
//                 calcSize = window.innerHeight * 3
//                 nSpaceRadius = window.innerHeight * 1.5
//                 actualSize = window.innerHeight
//             }
//             starCount.current = nSpaceRadius
//             stoneCount.current = nSpaceRadius / 10
//             const nRocketSize = window.innerHeight * 0.05
//             const nCenter: TCoord = {
//                 x: document.body.clientWidth / 2,
//                 y: window.innerHeight - nRocketSize - ROCKET_PADDING,
//             }
//             const nSpaceCoord: ISpaceSize = {
//                 start: {
//                     x: nCenter.x - nSpaceRadius,
//                     y: nCenter.y - nSpaceRadius,
//                 },
//                 end: {
//                     x: nCenter.x + nSpaceRadius,
//                     y: nCenter.y + nSpaceRadius,
//                 },
//             }

//             spaceRadius.current = nSpaceRadius
//             spaceCoord.current = nSpaceCoord
//             stoneSize.current = actualSize * 0.1
//             doubleStoneSize.current = actualSize * 0.2
//             stoneCrashSize.current = actualSize * 0.15
//             rocketSize.current = nRocketSize
//             fullSize.current = calcSize
//             lockResetSize.current = window.innerHeight * 4.5
//             // lockResetSize.current = calcSize * 1.5
//             moveLockSize.current = window.innerHeight * 1.5
//             // moveLockSize.current = calcSize * 0.5
//             center.current = nCenter
//             newRocketPosition()
//         }
//         updateSize()
//         getGame()
//         GameInit()

//         window.addEventListener('resize', updateSize)
//         return () => {
//             window.removeEventListener('resize', updateSize)
//         }
//     }, [])

//     const getGame = () => {
//         request('games/planet').then((response: IGameResponse) => {
//             setGame(response.data)
//             setPlanet(response.planet)
//             setFromPlanet(response.from || undefined)
//         })
//     }

//     const initPlanet = () => {
//         if (center.current && planetData) {
//             planet.current = {
//                 ...planetData,
//                 angle: 0,
//                 center: {
//                     x: center.current.x,
//                     y: center.current.y - planetData.start,
//                 },
//             }
//         }
//     }

//     useEffect(() => {
//         if (center.current && planetData) {
//             initPlanet()
//             const image = new Image()
//             image.src = planetData.img
//             image.onload = () => {
//                 planetImage.current = image
//             }
//         }
//     }, [planetData, center])

//     const initFromPlanet = () => {
//         if (center.current && fromPlanetData) {
//             const size = width.current > height.current ? height.current : width.current
//             fromPlanet.current = {
//                 ...fromPlanetData,
//                 angle: 0,
//                 center: {
//                     x: center.current.x,
//                     y: center.current.y + size / 3,
//                 },
//             }
//         }
//     }

//     useEffect(() => {
//         if (center.current && fromPlanetData) {
//             initFromPlanet()
//             const image = new Image()
//             image.src = fromPlanetData.img
//             image.onload = () => {
//                 fromPlanetImage.current = image
//             }
//         }
//     }, [fromPlanetData, center])

//     const GameInit = () => {
//         if (!spaceCoord.current || !center.current || !spaceRadius.current || !rocketSize.current) return
//         if (!ctx.current && ref.current) {
//             ctx.current = ref.current.getContext('2d')
//         }

//         rocket.current = {
//             up: {
//                 x: center.current.x,
//                 y: center.current.y,
//             },
//             left: {
//                 x: center.current.x - rocketSize.current / 2,
//                 y: center.current.y + rocketSize.current,
//             },
//             right: {
//                 x: center.current.x + rocketSize.current / 2,
//                 y: center.current.y + rocketSize.current,
//             },
//             center: {
//                 x: center.current.x,
//                 y: center.current.y + rocketSize.current * 0.75,
//             },
//             visible: 0,
//             shield: 0,
//         }

//         const spaceRadiusPow = Math.pow(spaceRadius.current, 2)

//         stars.current = []
//         for (let i = 0; i <= starCount.current; i++) {
//             const x = rand(spaceCoord.current.start.x, spaceCoord.current.end.x)
//             const y = Math.sqrt(spaceRadiusPow - Math.pow(center.current.x - x, 2))
//             const star: IStar = {
//                 coord: {
//                     x,
//                     y: rand(center.current.y - y, center.current.y + y),
//                 },
//                 size: rand(1, 2),
//                 color: starColors[rand(0, starColors.length - 1)],
//             }
//             stars.current.push(star)
//         }

//         stones.current = []
//         for (let i = 0; i <= stoneCount.current; i++) {
//             const x = rand(spaceCoord.current.start.x, spaceCoord.current.end.x)
//             const y = Math.sqrt(spaceRadiusPow - Math.pow(center.current.x - x, 2))
//             const stoneCenter: TCoord = {
//                 x,
//                 y: rand(center.current.y - y, center.current.y + y),
//             }

//             const stone: IStone = InitStone(stoneCenter, stoneSize.current)

//             stones.current.push(stone)
//         }

//         const x_health = rand(spaceCoord.current.start.x, spaceCoord.current.end.x)
//         const y_health = Math.sqrt(spaceRadiusPow - Math.pow(center.current.x - x_health, 2))
//         health.current = {
//             x: x_health,
//             y: rand(center.current.y - y_health, center.current.y + y_health),
//         }

//         const x_shield = rand(spaceCoord.current.start.x, spaceCoord.current.end.x)
//         const y_shield = Math.sqrt(spaceRadiusPow - Math.pow(center.current.x - x_shield, 2))
//         shield.current = {
//             x: x_health,
//             y: rand(center.current.y - y_shield, center.current.y + y_shield),
//         }

//         move()
//     }

//     const newRocketPosition = () => {
//         rocket.current = {
//             up: {
//                 x: center.current.x,
//                 y: center.current.y,
//             },
//             left: {
//                 x: center.current.x - rocketSize.current / 2,
//                 y: center.current.y + rocketSize.current,
//             },
//             right: {
//                 x: center.current.x + rocketSize.current / 2,
//                 y: center.current.y + rocketSize.current,
//             },
//             center: {
//                 x: center.current.x,
//                 y: center.current.y + rocketSize.current * 0.75,
//             },
//             visible: 0,
//             shield: 0,
//         }
//     }

//     const handleReset = () => {
//         speed.current = 0
//         inGame.current = false
//         points.current = 0
//         rocket.current.shield = 0
//         rocket.current.visible = 0
//         setPoints(0)
//         initPlanet()
//         initFromPlanet()
//     }

//     const handleMenu = () => {
//         setOpenSuccess(false)
//         setOpenCrash(false)
//         handleReset()
//         status.current = ESpaceStatus.INIT
//         setStatus(ESpaceStatus.INIT)
//         if (timer.current === null) {
//             move()
//         }
//     }

//     const handleGamePause = () => {
//         status.current = ESpaceStatus.PAUSE
//         setStatus(ESpaceStatus.PAUSE)
//     }

//     const handleGameContinue = () => {
//         status.current = ESpaceStatus.GAME
//         setStatus(ESpaceStatus.GAME)
//         move()
//     }

//     const handleGameStart = () => {
//         setOpenSuccess(false)
//         setOpenCrash(false)
//         status.current = ESpaceStatus.GAME
//         setStatus(ESpaceStatus.GAME)
//         stones.current = stones.current.map((stone) => ({
//             ...stone,
//             view: true,
//         }))
//         rocket.current.shield = 2000
//         bias.current = undefined
//         inGame.current = true
//         moveLock.current = false
//         lives.current = 3
//         points.current = 0
//         setPoints(0)
//         speed.current = 3
//         starSpeed.current = 3 / 2
//     }

//     const endSuccessGame = (points: number, planet_id: string) => {
//         request('games/setPlanet', {
//             method: 'POST',
//             data: {
//                 points,
//                 planet_id,
//             },
//         }).then((response: IGameResponse) => {
//             setGame(response.data)
//             setPlanet(response.planet)
//             setFromPlanet(response.from || undefined)
//         })
//     }

//     const moveAngle = (angle: number) => {
//         stars.current = stars.current.map((star) => moveStarAngle(star, angle))
//         stones.current = stones.current.map((stone) => moveStoneAngle(stone, angle))
//         health.current = moveHelpAngle(health.current, angle)
//         shield.current = moveHelpAngle(shield.current, angle)
//         if (planet.current) {
//             planet.current = movePlanetAngle(planet.current, angle)
//         }

//         draw()
//     }

//     const move = () => {
//         if (!center.current || !spaceCoord.current) return
//         if (timer.current) {
//             clearTimeout(timer.current)
//         }

//         if (!inGame.current || !planet.current) {
//             stars.current = stars.current.map((star) => moveStar(star, 0))
//             stones.current = stones.current.map((stone) => moveStone(stone, 0))
//             if (fromPlanet.current) {
//                 fromPlanet.current.angle += 0.0001
//             }
//         } else {
//             planet.current = movePlanet(planet.current, speed.current)
//             const radius = getRadius(center.current, planet.current.center)
//             lockReset.current = radius < lockResetSize.current
//             moveLock.current = radius < moveLockSize.current

//             let newPoints = points.current
//             if (speed.current && moveLock.current) {
//                 if (speed.current < 0.1) {
//                     speed.current = 0
//                     inGame.current = false
//                     setPlanetModal(planet.current)
//                     endSuccessGame(newPoints, planet.current.id)
//                     finishRound()
//                 } else if (radius < center.current.y * 0.5) {
//                     // remember center.y * 0.5?
//                     speed.current = (radius * 4) / center.current.y
//                 } else if (speed.current > 1) {
//                     speed.current -= 0.0005
//                 }
//             } else if (inGame.current) {
//                 speed.current += 0.0001
//             }
//             starSpeed.current = speed.current / 2

//             if (moveLock.current) {
//                 if (newPoints < planet.current.fullPoints) {
//                     newPoints++
//                 }
//             } else {
//                 newPoints = Math.floor((planet.current.start - radius) * planet.current.coefficient)
//             }

//             rocket.current = rocketAnimation(rocket.current, !!speed.current)

//             const crash = !rocket.current.shield
//                 ? stones.current.reduce((crash, stone) => {
//                       if (crash) return true
//                       return stone.view && crashStone(stone)
//                   }, false)
//                 : false

//             if (bias.current && bias.current > 0) {
//                 bias.current -= 1
//             } else {
//                 bias.current = undefined
//             }
//             if (crash) {
//                 if ('vibrate' in navigator) {
//                     // vibration API supported
//                     navigator.vibrate(1000)
//                 }
//                 rocket.current.shield += 2000
//                 lives.current--
//                 bias.current = biasPoints.length - 1
//             }

//             if (inGame.current && lives.current <= 0) {
//                 speed.current = 0
//                 inGame.current = false
//                 endSuccessGame(newPoints, fromPlanet.current?.id || '0')
//                 setCrashMess(badEnds[rand(0, badEnds.length - 1)])
//                 setOpenCrash(true)
//             }

//             health.current = moveHelp(health.current, speed.current)
//             shield.current = moveHelp(shield.current, speed.current)
//             const crashHealth = crashHelp(health.current)
//             const crashShield = crashHelp(shield.current)
//             if (crashShield) {
//                 rocket.current.shield += 4000
//                 bias.current = 1
//                 const x = rand(spaceCoord.current.start.x, spaceCoord.current.end.x)
//                 const y = Math.sqrt(Math.pow(spaceRadius.current * 2, 2) - Math.pow(center.current.x - x, 2))
//                 shield.current = {
//                     x,
//                     y: center.current.y - y,
//                 }
//             }
//             if (crashHealth) {
//                 lives.current++
//                 bias.current = 1
//                 const x = rand(spaceCoord.current.start.x, spaceCoord.current.end.x)
//                 const y = Math.sqrt(Math.pow(spaceRadius.current * 2, 2) - Math.pow(center.current.x - x, 2))
//                 health.current = {
//                     x,
//                     y: center.current.y - y,
//                 }
//             }

//             stars.current = stars.current.map((star) => moveStar(star, starSpeed.current))
//             stones.current = stones.current.map((stone) => moveStone(stone, speed.current))
//             if (newPoints > points.current) {
//                 points.current = newPoints
//                 setPoints(newPoints)
//             }
//             if (fromPlanet.current) {
//                 fromPlanet.current = movePlanet(fromPlanet.current, speed.current)
//             }
//         }

//         draw()

//         if (status.current !== ESpaceStatus.PAUSE) {
//             timer.current = setTimeout(() => {
//                 move()
//             }, TICK)
//         } else {
//             timer.current = null
//         }
//     }

//     const crashHelp = (point: TCoord) => {
//         if (!center.current) return false
//         const radius = getRadius(center.current, point)
//         if (radius < 20) return true
//         return false
//     }

//     const moveHelp = (point: TCoord, speed: number) => {
//         if (!spaceRadius.current || !center.current || !spaceCoord.current) return point
//         const radius = getRadius(center.current, point)
//         if (radius > spaceRadius.current * 2) {
//             const x = rand(spaceCoord.current.start.x, spaceCoord.current.end.x)
//             const y = Math.sqrt(Math.pow(spaceRadius.current * 2, 2) - Math.pow(center.current.x - x, 2))
//             return {
//                 x,
//                 y: center.current.y - y,
//             }
//         }
//         return {
//             ...point,
//             y: point.y + speed,
//         }
//     }

//     const movePlanet = (planet: IPlanet, speed: number) => {
//         return {
//             ...planet,
//             center: {
//                 ...planet.center,
//                 y: planet.center.y + speed,
//             },
//         }
//     }

//     const crashStone = (stone: IStone) => {
//         if (!center.current || !stoneCrashSize.current) return false
//         if (
//             stoneCrashSize.current < Math.abs(center.current.x - stone.center.x) ||
//             stoneCrashSize.current < Math.abs(center.current.y - stone.center.y)
//         ) {
//             return false
//         }

//         let intersections = false
//         stone.vertex.forEach((point1, index) => {
//             if (!center.current) return
//             const point2 = index === 0 ? stone.vertex[stone.vertex.length - 1] : stone.vertex[index - 1]
//             if (
//                 point1.x === point2.x &&
//                 ((point1.y >= center.current.y && point2.y <= center.current.y) ||
//                     (point1.y <= center.current.y && point2.y >= center.current.y))
//             ) {
//                 intersections = !intersections
//             } else if (
//                 (center.current.x >= point1.x && center.current.x <= point2.x) ||
//                 (center.current.x <= point1.x && center.current.x >= point2.x)
//             ) {
//                 const k = (point1.y - point2.y) / (point1.x - point2.x)
//                 const b = point1.y - k * point1.x
//                 if (center.current.y <= center.current.x * k + b) {
//                     intersections = !intersections
//                 }
//             }
//         })
//         return intersections
//     }

//     const moveStone = (stone: IStone, speed: number) => {
//         if (!spaceRadius.current || !center.current || !spaceCoord.current) return stone
//         const radius = getRadius(center.current, stone.center)
//         if (radius > spaceRadius.current) {
//             const x = rand(spaceCoord.current.start.x, spaceCoord.current.end.x)
//             const y = Math.sqrt(Math.pow(spaceRadius.current, 2) - Math.pow(center.current.x - x, 2))
//             const stoneCenter: TCoord = {
//                 x,
//                 y: center.current.y - y,
//             }
//             return InitStone(stoneCenter, stoneSize.current, lockReset.current)
//         }
//         return {
//             ...stone,
//             center: {
//                 x: stone.center.x + stone.speed.x,
//                 y: stone.center.y + stone.speed.y + speed,
//             },
//             vertex: stone.vertex.map((vertex) => ({
//                 x: vertex.x + stone.speed.x,
//                 y: vertex.y + stone.speed.y + speed,
//             })),
//         }
//     }

//     const moveStar = (star: IStar, speed: number) => {
//         if (!spaceRadius.current || !center.current || !spaceCoord.current) return star
//         const radius = getRadius(center.current, star.coord)
//         if (radius > spaceRadius.current) {
//             const x = rand(spaceCoord.current.start.x, spaceCoord.current.end.x)
//             const y = Math.sqrt(Math.pow(spaceRadius.current, 2) - Math.pow(center.current.x - x, 2))
//             const coord: TCoord = {
//                 x,
//                 y: center.current.y - y,
//             }
//             return {
//                 ...star,
//                 coord,
//             }
//         }
//         return {
//             ...star,
//             coord: {
//                 x: speed ? star.coord.x : star.coord.x + DEFAULT_SPEED * DEFAULT_SPEED,
//                 y: speed ? star.coord.y + speed : star.coord.y + DEFAULT_SPEED,
//             },
//         }
//     }

//     const moveHelpAngle = (point: TCoord, angle: number) => {
//         if (!center.current) return point
//         return getNewCoord(center.current, point, angle)
//     }

//     const movePlanetAngle = (planet: IPlanet, angle: number) => {
//         if (!center.current) return planet
//         return {
//             ...planet,
//             center: getNewCoord(center.current, planet.center, angle),
//         }
//     }

//     const moveStarAngle = (star: IStar, angle: number) => {
//         if (!center.current) return star
//         return {
//             ...star,
//             coord: getNewCoord(center.current, star.coord, angle),
//         }
//     }

//     const moveStoneAngle = (stone: IStone, angle: number) => {
//         if (!center.current) return stone
//         return {
//             ...stone,
//             center: getNewCoord(center.current, stone.center, angle),
//             vertex: stone.vertex.map((vertex) => getNewCoord(center.current, vertex, angle)),
//         }
//     }

//     const rocketAnimation = (rocket: IRocket, isMoving: boolean) => {
//         if (!isMoving) {
//             return {
//                 ...rocket,
//                 visible: 0,
//             }
//         }
//         if (rocket.visible === 0) {
//             return {
//                 ...rocket,
//                 visible: 200,
//                 shield: rocket.shield > 0 ? rocket.shield - TICK : 0,
//             }
//         }
//         return {
//             ...rocket,
//             visible: rocket.visible - 5,
//             shield: rocket.shield > 0 ? rocket.shield - TICK : 0,
//         }
//     }

//     const draw = () => {
//         if (!ctx.current) return

//         ctx.current.clearRect(0, 0, width.current, height.current)

//         if (bias.current !== undefined && bias.current >= 0) {
//             ctx.current.translate(biasPoints[bias.current || 0].x, biasPoints[bias.current || 0].y)
//         }

//         ctx.current.fillStyle = Colors.blueGrey[900]
//         ctx.current.fillRect(0, 0, width.current, height.current)

//         stars.current.forEach((star) => {
//             if (ctx.current) {
//                 drawStar({
//                     ctx: ctx.current,
//                     star,
//                     width: width.current,
//                     height: height.current,
//                     visiblePadding: VISIBLE_PADDING,
//                 })
//             }
//         })
//         status.current !== ESpaceStatus.INIT &&
//             planet.current &&
//             drawPlanet({
//                 ctx: ctx.current,
//                 planet: planet.current,
//                 center: center.current,
//                 width: width.current,
//                 height: height.current,
//                 planetImage: planetImage.current,
//                 moveLock: moveLock.current,
//                 moveAngle,
//             })
//         fromPlanet.current &&
//             fromPlanetImage.current &&
//             drawFromPlanet({
//                 ctx: ctx.current,
//                 planet: fromPlanet.current,
//                 center: center.current,
//                 width: width.current,
//                 height: height.current,
//                 fromPlanetImage: fromPlanetImage.current,
//             })
//         stones.current.forEach((stone) => {
//             if (ctx.current) {
//                 drawStone({
//                     ctx: ctx.current,
//                     stone,
//                     width: width.current,
//                     height: height.current,
//                     doubleStoneSize: doubleStoneSize.current,
//                 })
//             }
//         })
//         drawRocket({
//             ctx: ctx.current,
//             rocket: rocket.current,
//             rocketSize: rocketSize.current,
//             rocketRadius: ROCKET_RADIUS,
//         })
//         status.current !== ESpaceStatus.INIT &&
//             drawShield({
//                 ctx: ctx.current,
//                 point: shield.current,
//             })
//         status.current !== ESpaceStatus.INIT &&
//             drawHealth({
//                 ctx: ctx.current,
//                 point: health.current,
//             })
//         status.current !== ESpaceStatus.INIT &&
//             drawLives({
//                 ctx: ctx.current,
//                 lives: lives.current,
//                 width: width.current,
//             })

//         if (bias.current !== undefined && bias.current >= 0) {
//             ctx.current.translate(-biasPoints[bias.current || 0].x, -biasPoints[bias.current || 0].y)
//         }
//     }

//     const finishRound = () => {
//         setOpenSuccess(true)
//     }

//     const eventStart = useCallback((e: MouseEvent) => {
//         console.log('es')
//         startMove.current = {
//             x: e.x,
//             y: e.y,
//         }
//     }, [])

//     const eventMove = useCallback((e: MouseEvent) => {
//         if (!startMove.current || !center.current) return
//         const angle = Math.atan((e.x - startMove.current.x) / (center.current.y - startMove.current.y))

//         angle && !moveLock.current && moveAngle(angle)

//         startMove.current = {
//             x: e.x,
//             y: e.y,
//         }
//     }, [])

//     const eventTouchStart = (e: TouchEvent) => {
//         startMove.current = {
//             x: e.touches[0].pageX,
//             y: e.touches[0].pageY,
//         }
//     }

//     const eventTouchMove = (e: TouchEvent) => {
//         if (!startMove.current || !center.current) return
//         const angle = Math.atan((e.touches[0].pageX - startMove.current.x) / (center.current.y - startMove.current.y))

//         angle && !moveLock.current && moveAngle(angle)

//         startMove.current = {
//             x: e.touches[0].pageX,
//             y: e.touches[0].pageY,
//         }
//     }

//     const eventEnd = () => {
//         startMove.current = undefined
//     }

//     useEffect(() => {
//         document.addEventListener('mousedown', eventStart)
//         document.addEventListener('mousemove', eventMove)
//         document.addEventListener('mouseup', eventEnd)
//         document.addEventListener('touchstart', eventTouchStart)
//         document.addEventListener('touchend', eventEnd)
//         document.addEventListener('touchcancel', eventEnd)
//         document.addEventListener('touchmove', eventTouchMove)
//         return () => {
//             document.removeEventListener('mousedown', eventStart)
//             document.removeEventListener('mousemove', eventMove)
//             document.removeEventListener('mouseup', eventEnd)
//             document.removeEventListener('touchstart', eventTouchStart)
//             document.removeEventListener('touchend', eventEnd)
//             document.removeEventListener('touchcancel', eventEnd)
//             document.removeEventListener('touchmove', eventTouchMove)
//         }
//     }, [])

//     const scrollLock = () => {
//         const scrollPosition = window.pageYOffset || document.documentElement.scrollTop

//         // Ставим нужные стили
//         document.body.style.overflow = 'hidden'
//         document.body.style.position = 'fixed'
//         document.body.style.top = '-' + scrollPosition + 'px'
//         document.body.style.left = '0'
//         document.body.style.width = '100%'
//     }

//     const scrollUnlock = () => {
//         document.body.style.overflow = ''
//         document.body.style.position = ''
//         document.body.style.top = ''
//         document.body.style.left = ''
//         document.body.style.width = ''
//     }

//     useEffect(() => {
//         scrollLock()
//         return () => {
//             scrollUnlock()
//         }
//     }, [])

//     useEffect(() => {
//         if (isSoundOn) {
//             if (statusState === ESpaceStatus.INIT) {
//                 stopGame()
//                 playMain()
//             } else if (statusState === ESpaceStatus.GAME) {
//                 stopMain()
//                 playGame()
//             }
//         } else {
//             stopMain()
//             stopGame()
//         }
//     }, [statusState, isSoundOn])

//     return (
//         <Box
//             sx={{
//                 width: '100%',
//                 position: 'fixed',
//                 top: 0,
//                 left: 0,
//                 bgcolor: Colors.blueGrey[900],
//                 overflow: 'hidden',
//                 userSelect: 'none',
//             }}
//         >
//             <canvas ref={ref} width={widthState} height={heightState} />

//             {(statusState === ESpaceStatus.GAME || statusState === ESpaceStatus.PAUSE) && (
//                 <Box
//                     sx={{
//                         position: 'absolute',
//                         top: 0,
//                         width: '100%',
//                         display: 'flex',
//                         justifyContent: 'center',
//                     }}
//                 >
//                     <Typography variant="h4" color="white">
//                         {pointsState}
//                     </Typography>
//                 </Box>
//             )}

//             {statusState === ESpaceStatus.PAUSE && (
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         position: 'absolute',
//                         p: 4,
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         flexDirection: 'column',
//                         gap: 4,
//                     }}
//                 >
//                     <Button
//                         fullWidth
//                         disabled={!planet.current}
//                         size="large"
//                         variant="contained"
//                         color="info"
//                         sx={{ maxWidth: '500px' }}
//                         onClick={handleGameContinue}
//                     >
//                         Продолжить
//                     </Button>
//                     <Button fullWidth variant="contained" color="info" sx={{ maxWidth: '500px' }} onClick={handleMenu}>
//                         Меню
//                     </Button>
//                 </Box>
//             )}

//             {statusState === ESpaceStatus.GAME && (
//                 <IconButton
//                     aria-label="sound"
//                     sx={{
//                         position: 'absolute',
//                         top: 20,
//                         left: 20,
//                     }}
//                     onClick={handleGamePause}
//                 >
//                     <PauseCircleOutlineIcon sx={{ color: Colors.blueGrey[50] }} />
//                 </IconButton>
//             )}

//             {statusState === ESpaceStatus.INIT && (
//                 <>
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             position: 'absolute',
//                             p: 4,
//                             top: 0,
//                             left: 0,
//                             width: '100%',
//                             height: '100%',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             flexDirection: 'column',
//                             gap: 4,
//                         }}
//                     >
//                         <Typography variant="h1" color="white">
//                             SPACE
//                         </Typography>
//                         <Button
//                             fullWidth
//                             disabled={!planet.current}
//                             size="large"
//                             variant="contained"
//                             color="info"
//                             sx={{ maxWidth: '500px' }}
//                             onClick={handleGameStart}
//                         >
//                             Играть
//                         </Button>
//                         <Button
//                             fullWidth
//                             variant="contained"
//                             color="info"
//                             sx={{ maxWidth: '500px' }}
//                             onClick={() => setResultsOpen(true)}
//                         >
//                             Результаты
//                         </Button>
//                         <Button
//                             fullWidth
//                             variant="contained"
//                             color="info"
//                             sx={{ maxWidth: '500px' }}
//                             href="https://pay.mysbertips.ru/50776202"
//                             target="_blank"
//                         >
//                             Подарить кофе
//                         </Button>
//                         <Button fullWidth variant="contained" color="info" sx={{ maxWidth: '500px' }}>
//                             Выйти
//                         </Button>
//                     </Box>

//                     <IconButton
//                         aria-label="sound"
//                         sx={{
//                             position: 'absolute',
//                             top: 20,
//                             left: 20,
//                         }}
//                         onClick={() => {
//                             setSoundOn((value) => !value)
//                         }}
//                     >
//                         {isSoundOn ? (
//                             <VolumeUpIcon sx={{ color: Colors.blueGrey[50] }} />
//                         ) : (
//                             <VolumeOffIcon sx={{ color: Colors.blueGrey[50] }} />
//                         )}
//                     </IconButton>
//                 </>
//             )}

//             <Dialog fullScreen open={openSuccess}>
//                 <Box
//                     sx={{
//                         width: '100%',
//                         bgcolor: Colors.blueGrey[700],
//                         display: 'flex',
//                         p: 4,
//                         flexDirection: 'column',
//                         gap: 8,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         flex: 'auto',
//                     }}
//                 >
//                     <Typography variant="h4" color="white">
//                         Вы достигли {planetModal?.finish_name}!
//                     </Typography>

//                     <Box
//                         sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             gap: 1,
//                         }}
//                     >
//                         <Typography variant="body1" color="white">
//                             Очков заработано:
//                         </Typography>

//                         <Typography variant="h5" color={Colors.yellow[700]}>
//                             {pointsState}
//                         </Typography>
//                     </Box>

//                     <Typography variant="body1" color="white" sx={{ textAlign: 'center' }}>
//                         {planetModal?.description}
//                     </Typography>

//                     <Button
//                         fullWidth
//                         size="large"
//                         variant="contained"
//                         color="info"
//                         sx={{ maxWidth: '500px' }}
//                         onClick={handleGameStart}
//                     >
//                         Продолжить
//                     </Button>
//                 </Box>
//             </Dialog>

//             <Dialog fullScreen open={openCrash}>
//                 <Box
//                     sx={{
//                         width: '100%',
//                         bgcolor: Colors.blueGrey[700],
//                         display: 'flex',
//                         p: 4,
//                         flexDirection: 'column',
//                         gap: 8,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         flex: 'auto',
//                     }}
//                 >
//                     <Typography variant="h4" color="white">
//                         {game && pointsState > game?.best ? 'Новый рекорд!' : 'Потрачено'}
//                     </Typography>

//                     <Box
//                         sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             gap: 1,
//                         }}
//                     >
//                         <Typography variant="body1" color="white">
//                             Очков заработано:
//                         </Typography>

//                         <Typography variant="h5" color={Colors.yellow[700]}>
//                             {pointsState}
//                         </Typography>
//                     </Box>

//                     <Typography variant="body1" color="white" sx={{ textAlign: 'center' }}>
//                         {game && pointsState > game?.best
//                             ? 'Я так вами горжусь, что не передать словами! Мы на всегда запомним 272 байта о вас ♥'
//                             : crashMess}
//                     </Typography>

//                     <Box
//                         sx={{
//                             width: '100%',
//                             display: 'flex',
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                             gap: 1,
//                         }}
//                     >
//                         <Button
//                             fullWidth
//                             size="large"
//                             variant="contained"
//                             color="info"
//                             sx={{ maxWidth: '500px' }}
//                             onClick={handleGameStart}
//                         >
//                             Еще раз
//                         </Button>

//                         <Button
//                             fullWidth
//                             size="medium"
//                             variant="contained"
//                             color="info"
//                             sx={{ maxWidth: '500px' }}
//                             onClick={handleMenu}
//                         >
//                             Меню
//                         </Button>
//                     </Box>
//                 </Box>
//             </Dialog>

//             <Results isOpen={isResultsOpen} handleClose={() => setResultsOpen(false)} />
//         </Box>
//     )
// }
