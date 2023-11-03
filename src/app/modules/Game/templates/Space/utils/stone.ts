import * as Colors from '@mui/material/colors'
import { rand } from 'utils/rand'

import { ISoneShell, ISpaceSize, IStone, IVisibleSpaceSize, TCoord } from '../types/Space'
import { getLineFunctionsFromPoints, isPointInside } from './visible'

interface IAreaStone {
    start: TCoord
    end: TCoord
}

const areas: IAreaStone[] = [
    {
        start: {
            x: -0.5,
            y: -1,
        },
        end: {
            x: 0.5,
            y: 0,
        },
    },
    {
        start: {
            x: 0.5,
            y: -1,
        },
        end: {
            x: 1.5,
            y: 0,
        },
    },
    {
        start: {
            x: 0.5,
            y: 0,
        },
        end: {
            x: 1.5,
            y: 1,
        },
    },
    {
        start: {
            x: -0.5,
            y: 0,
        },
        end: {
            x: 0.5,
            y: 1,
        },
    },
    {
        start: {
            x: -1.5,
            y: 0,
        },
        end: {
            x: -0.5,
            y: 1,
        },
    },
    {
        start: {
            x: -1.5,
            y: -1,
        },
        end: {
            x: -0.5,
            y: 0,
        },
    },
]

export const Stone = (spaceCoord: ISpaceSize, index: number, lockReset = false): IStone => {
    return {
        index,
        center: {
            x: rand(spaceCoord.start.x, spaceCoord.end.x),
            y: rand(spaceCoord.start.y, spaceCoord.end.y),
        },
        speed: {
            x: rand(-0.02, 0.02, 10000, 0.0001),
            y: rand(-0.02, 0.02, 10000, 0.0001),
        },
        active: !lockReset,
        visible: false,
    }
}

export const moveStone = (
    stone: IStone,
    currentTick: number,
    center: TCoord,
    speed: TCoord,
    spaceRadius?: number,
    visibleStoneCoord?: IVisibleSpaceSize,
    lockReset = false
): IStone => {
    stone.center.x += speed.x + stone.speed.x * currentTick
    stone.center.y += speed.y + stone.speed.y * currentTick
    if (!!spaceRadius && !!visibleStoneCoord) {
        if (
            stone.center.x < visibleStoneCoord.min.x ||
            stone.center.x > visibleStoneCoord.max.x ||
            stone.center.y < visibleStoneCoord.min.y ||
            stone.center.y > visibleStoneCoord.max.y
        ) {
            if (stone.center.y < center.y - spaceRadius) {
                stone.center.y = center.y + spaceRadius
                stone.center.x = center.x + center.x - stone.center.x
                stone.active = !lockReset
            } else if (stone.center.y > center.y + spaceRadius) {
                stone.center.y = center.y - spaceRadius
                stone.center.x = center.x + center.x - stone.center.x
                stone.active = !lockReset
            } else if (stone.center.x < center.x - spaceRadius) {
                stone.center.x = center.x + spaceRadius
                stone.center.y = center.y + center.y - stone.center.y
                stone.active = !lockReset
            } else if (stone.center.x > center.x + spaceRadius) {
                stone.center.x = center.x - spaceRadius
                stone.center.y = center.y + center.y - stone.center.y
                stone.active = !lockReset
            }
            stone.visible = false
        } else if (!isPointInside(stone.center, visibleStoneCoord.lines)) {
            stone.visible = false
        } else {
            stone.visible = true
        }
    }
    return stone
}

export const drawStone = (
    ctx: CanvasRenderingContext2D,
    stone: IStone,
    sprite: HTMLCanvasElement,
    deltaStoneSize: TCoord
) => {
    ctx.drawImage(sprite, stone.center.x - deltaStoneSize.x, stone.center.y - deltaStoneSize.y)
}

export const crashStone = (stoneShell: ISoneShell, stone: IStone, center: TCoord, stoneCrashSize: number) => {
    if (stoneCrashSize < Math.abs(center.x - stone.center.x) || stoneCrashSize < Math.abs(center.y - stone.center.y)) {
        return false
    }
    const point: TCoord = {
        x: center.x - stone.center.x,
        y: center.y - stone.center.y,
    }
    return isPointInside(point, stoneShell.lines)
}

export const initStoneSprite = (stoneSize: number) => {
    const stoneSprite = document.createElement('canvas')
    stoneSprite.width = stoneSize * 3 + 8
    stoneSprite.height = stoneSize * 2 + 8
    const ctx = stoneSprite.getContext('2d')
    const vertex: TCoord[] = []
    areas.forEach((area) => {
        vertex.push({
            x: rand(area.start.x, area.end.x, 100, 0.01) * stoneSize,
            y: rand(area.start.y, area.end.y, 100, 0.01) * stoneSize,
        })
    })
    if (ctx) {
        ctx.fillStyle = Colors.orange[500]
        ctx.translate(stoneSize * 1.5 + 4, stoneSize + 4)
        vertex.forEach((vertex) => {
            ctx.beginPath()
            ctx.arc(vertex.x, vertex.y, 4, 0, 2 * Math.PI)
            ctx.fill()
        })
        ctx.strokeStyle = Colors.orange[500]
        ctx.beginPath()
        vertex.forEach((vertex, index) => {
            if (index === 0) {
                ctx.moveTo(vertex.x, vertex.y)
            } else {
                ctx.lineTo(vertex.x, vertex.y)
            }
        })
        ctx.lineTo(vertex[0].x, vertex[0].y)
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.fillStyle = 'rgba(255, 204, 128, 0.1)'
        ctx.beginPath()
        vertex.forEach((vertex, index) => {
            if (index === 0) {
                ctx.moveTo(vertex.x, vertex.y)
            } else {
                ctx.lineTo(vertex.x, vertex.y)
            }
        })
        ctx.lineTo(vertex[0].x, vertex[0].y)
        ctx.fill()

        ctx.translate(-stoneSize * 1.5 - 4, -stoneSize - 4)
    }

    return {
        vertex,
        sprite: stoneSprite,
        lines: getLineFunctionsFromPoints(vertex),
    }
}
