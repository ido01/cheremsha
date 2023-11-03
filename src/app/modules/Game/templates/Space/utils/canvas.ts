import * as Colors from '@mui/material/colors'

import { IPlanet, IRocket, IVisibleSpaceSize, TCoord } from '../types/Space'

interface drawHelpProps {
    ctx: CanvasRenderingContext2D
    point: TCoord
    sprite: HTMLCanvasElement
}

export const drawHelp = ({ ctx, point, sprite }: drawHelpProps) => {
    ctx.drawImage(sprite, point.x - 21, point.y - 21)
}

interface drawFromPlanetProps {
    ctx: CanvasRenderingContext2D
    planet: IPlanet
    planetSize: number
    halfPlanetSize: number
    fromPlanetImage: HTMLImageElement
}

export const drawFromPlanet = ({ ctx, planet, fromPlanetImage, planetSize, halfPlanetSize }: drawFromPlanetProps) => {
    ctx.translate(planet.center.x, planet.center.y)
    ctx.rotate(planet.angle)
    ctx.drawImage(fromPlanetImage, -halfPlanetSize, -halfPlanetSize, planetSize, planetSize)
    ctx.rotate(-planet.angle)
    ctx.translate(-planet.center.x, -planet.center.y)
}

interface drawPlanetProps {
    ctx: CanvasRenderingContext2D
    planet: IPlanet
    planetSize: number
    halfPlanetSize: number
    planetImage?: HTMLImageElement
}

export const drawPlanet = ({ ctx, planet, planetImage, planetSize, halfPlanetSize }: drawPlanetProps) => {
    if (!planetImage) return
    ctx.drawImage(
        planetImage,
        planet.center.x - halfPlanetSize,
        planet.center.y - halfPlanetSize,
        planetSize,
        planetSize
    )
}

interface drawWayProps {
    ctx: CanvasRenderingContext2D
    planet: IPlanet
    center: TCoord
    visibleSpace: IVisibleSpaceSize
    sprite: HTMLCanvasElement
}

export const drawWay = ({ ctx, planet, center, visibleSpace, sprite }: drawWayProps) => {
    const k = center.x === planet.center.x ? 0 : (center.y - planet.center.y) / (center.x - planet.center.x)
    const b = center.y - k * center.x
    visibleSpace.lines
        .filter((l, index) => {
            if (planet.angle > Math.PI && index === 3) return false
            if (planet.angle < Math.PI && index === 1) return false
            if (planet.angle < 1.5 * Math.PI && planet.angle > 0.5 * Math.PI && index === 2) return false
            if (planet.angle > 1.5 * Math.PI && index === 0) return false
            if (planet.angle < 0.5 * Math.PI && index === 0) return false
            return true
        })
        .forEach((line) => {
            const x = line.k === k ? 0 : (b - line.b) / (line.k - k)
            const y = k * x + b
            if (
                ((x >= line.point1.x && x <= line.point2.x) || (x <= line.point1.x && x >= line.point2.x)) &&
                ((y >= line.point1.y && y <= line.point2.y) || (y <= line.point1.y && y >= line.point2.y))
            ) {
                ctx.drawImage(sprite, x - 22, y - 22)
            }
        })
}

interface drawRocketProps {
    ctx: CanvasRenderingContext2D
    sprite: HTMLCanvasElement
    center: TCoord
    rocket: IRocket
    rocketSize: number
    deltaRocketPosition: number
    rocketRadius: number
}

export const drawRocket = ({
    ctx,
    sprite,
    center,
    rocket,
    rocketSize,
    deltaRocketPosition,
    rocketRadius,
}: drawRocketProps) => {
    ctx.drawImage(sprite, center.x - deltaRocketPosition, center.y - rocketRadius)

    // fire
    const percent = (rocket.visible > 100 ? (200 - rocket.visible) % 100 : rocket.visible) / 100
    ctx.strokeStyle = `rgba(255, 87, 34, ${percent})`
    ctx.beginPath()
    ctx.moveTo(rocket.left.x + 3, rocket.left.y + 8)
    ctx.lineTo(rocket.center.x, rocket.center.y + 8)
    ctx.lineTo(rocket.right.x - 3, rocket.right.y + 8)
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.strokeStyle = `rgba(255, 153, 0, ${percent})`
    ctx.beginPath()
    ctx.moveTo(rocket.left.x + 5, rocket.left.y + 10)
    ctx.lineTo(rocket.center.x, rocket.center.y + 11)
    ctx.lineTo(rocket.right.x - 5, rocket.right.y + 10)
    ctx.lineWidth = 3
    ctx.stroke()

    // shield
    if (rocket.shield) {
        const shieldRest = rocket.shield % 1000
        let shieldPercent = shieldRest > 500 ? (1000 - shieldRest) / 500 : shieldRest / 500
        let percent = (Math.PI * rocket.shield) / rocket.fullShield
        if (percent < 0) {
            percent = 0
        }
        ctx.strokeStyle = `rgb(0, 188, 212)`
        ctx.beginPath()
        ctx.arc(rocket.center.x, rocket.center.y - 5, rocketSize, 1.5 * Math.PI - percent, 1.5 * Math.PI + percent)
        ctx.stroke()

        shieldPercent = shieldPercent * 0.1
        ctx.fillStyle = `rgba(0, 188, 212, ${shieldPercent})`
        ctx.beginPath()
        ctx.arc(rocket.center.x, rocket.center.y - 5, rocketSize, 0, 2 * Math.PI)
        ctx.fill()
    }
}

interface drawLivesProps {
    ctx: CanvasRenderingContext2D
    lives: number
    width: number
    sprite: HTMLCanvasElement
}

export const drawLives = ({ ctx, lives, width, sprite }: drawLivesProps) => {
    for (let i = 0; i < lives; i++) {
        ctx.drawImage(sprite, width - 40 - (i % 3) * 30, 10 + Math.floor(i / 3) * 30)
    }
}

export const drawHeart = (ctx: CanvasRenderingContext2D, coord: TCoord) => {
    ctx.beginPath()
    ctx.fillStyle = Colors.red.A400
    ctx.moveTo(coord.x - 10, coord.y + 5)
    ctx.bezierCurveTo(coord.x - 7.5, coord.y - 5, coord.x + 15, coord.y + 5, coord.x - 10, coord.y + 20)
    ctx.bezierCurveTo(coord.x - 35, coord.y + 5, coord.x - 12.5, coord.y - 5, coord.x - 10, coord.y + 5)
    ctx.fill()
}
