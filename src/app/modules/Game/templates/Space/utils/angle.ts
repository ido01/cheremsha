import { TCoord } from '../types/Space'

export const getRadius = (center: TCoord, point: TCoord): number => {
    return Math.hypot(center.x - point.x, center.y - point.y)
}

export const getNewCoord = (center: TCoord, start: TCoord, angle: number): TCoord => {
    const newAngle = getAngle(center, start) + angle
    const radius = getRadius(center, start)
    return {
        x: center.x + radius * Math.cos(newAngle),
        y: center.y + radius * Math.sin(newAngle),
    }
}

export const getNewInitCoord = (center: TCoord, radius: number, angle: number): TCoord => {
    return {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
    }
}

export const getNewCoordWithoutAngle = (center: TCoord, start: TCoord, angle: number): TCoord => {
    const radius = getRadius(center, start)
    return {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
    }
}

export const getAngle = (center: TCoord, point: TCoord) => {
    const x = point.x - center.x
    const y = point.y - center.y
    if (y == 0) return x > 0 ? 0 : Math.PI
    if (x == 0) return y > 0 ? Math.PI * 0.5 : 1.5 * Math.PI
    let a = Math.atan(y / x)
    a = x > 0 ? a : Math.PI + a
    return a
}
