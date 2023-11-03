import { IPointSpace, IVisibleSpaceSize, TCoord, TLine } from '../types/Space'
import { getAngle, getNewInitCoord, getRadius } from './angle'

interface IMinMaxHelp {
    min: TCoord
    max: TCoord
}

export const isPointInside = (point: TCoord, lines: TLine[]) => {
    let intersections = false
    lines.forEach((line) => {
        if (
            line.point1.x === line.point2.x &&
            point.x === line.point2.x &&
            ((line.point1.y <= point.y && line.point2.y >= point.y) ||
                (line.point1.y >= point.y && line.point2.y <= point.y))
        ) {
            intersections = !intersections
        } else if (
            line.point1.y === line.point2.y &&
            point.y <= line.point2.y &&
            ((line.point1.x <= point.x && line.point2.x >= point.x) ||
                (line.point1.x >= point.x && line.point2.x <= point.x))
        ) {
            intersections = !intersections
        } else if (
            ((point.x >= line.point1.x && point.x <= line.point2.x) ||
                (point.x <= line.point1.x && point.x >= line.point2.x)) &&
            point.y <= point.x * line.k + line.b
        ) {
            intersections = !intersections
        }
    })
    return intersections
}

export const isPointInsideDinamic = (point: TCoord, points: TCoord[], k: number[]) => {
    let intersections = false
    points.forEach((point1, index) => {
        const point2 = index === 0 ? points[points.length - 1] : points[index - 1]
        const line: TLine = getLineFunctionWithK(point1, point2, k[index])
        if (
            line.point1.x === line.point2.x &&
            point.x === line.point2.x &&
            ((line.point1.y <= point.y && line.point2.y >= point.y) ||
                (line.point1.y >= point.y && line.point2.y <= point.y))
        ) {
            intersections = !intersections
        } else if (
            line.point1.y === line.point2.y &&
            point.y <= line.point2.y &&
            ((line.point1.x <= point.x && line.point2.x >= point.x) ||
                (line.point1.x >= point.x && line.point2.x <= point.x))
        ) {
            intersections = !intersections
        } else if (
            ((point.x >= line.point1.x && point.x <= line.point2.x) ||
                (point.x <= line.point1.x && point.x >= line.point2.x)) &&
            point.y <= point.x * line.k + line.b
        ) {
            intersections = !intersections
        }
    })
    return intersections
}

export const InitVisible = (center: TCoord, first: TCoord, second: TCoord): IVisibleSpaceSize => {
    const initPoints: TCoord[] = []
    initPoints.push({
        x: first.x,
        y: first.y,
    })
    initPoints.push({
        x: second.x,
        y: first.y,
    })
    initPoints.push({
        x: second.x,
        y: second.y,
    })
    initPoints.push({
        x: first.x,
        y: second.y,
    })

    const points: IPointSpace[] = initPoints.map((point) => ({
        point,
        radius: getRadius(center, point),
        angle: getAngle(center, point),
    }))

    const { min, max } = getMinMax(points)

    const lines = getLineFunctions(points)

    return {
        min,
        max,
        points,
        lines,
    }
}

export const reAngleVisible = (center: TCoord, visible: IVisibleSpaceSize, angle: number): IVisibleSpaceSize => {
    visible.points = visible.points.map((point) => {
        point.point = getNewInitCoord(center, point.radius, point.angle - angle)
        return point
    })
    const { min, max } = getMinMax(visible.points)
    visible.min = min
    visible.max = max
    visible.lines = getLineFunctions(visible.points)

    return visible
}

export const moveVisible = (visible: IVisibleSpaceSize, speed: TCoord): IVisibleSpaceSize => {
    visible.points = visible.points.map((p) => {
        p.point = {
            x: p.point.x + speed.x,
            y: p.point.y + speed.y,
        }
        return p
    })
    visible.lines = visible.lines.map((l) => {
        l.point1 = {
            x: l.point1.x + speed.x,
            y: l.point1.y + speed.y,
        }
        l.point2 = {
            x: l.point2.x + speed.x,
            y: l.point2.y + speed.y,
        }
        return modifyLineFunctions(l)
    })
    visible.min = {
        x: visible.min.x + speed.x,
        y: visible.min.y + speed.y,
    }
    visible.max = {
        x: visible.max.x + speed.x,
        y: visible.max.y + speed.y,
    }

    return visible
}

export const getLineFunctions = (points: IPointSpace[]) =>
    points.map((point1, index) => {
        const point2 = index === 0 ? points[points.length - 1] : points[index - 1]
        return getLineFunction(point1.point, point2.point)
    })
export const getLineFunctionsFromPoints = (points: TCoord[]) =>
    points.map((point1, index) => {
        const point2 = index === 0 ? points[points.length - 1] : points[index - 1]
        return getLineFunction(point1, point2)
    })
export const getKLineFunctionsFromPoints = (points: TCoord[]): number[] =>
    points.map((point1, index) => {
        const point2 = index === 0 ? points[points.length - 1] : points[index - 1]
        return getKLineFunction(point1, point2)
    })

export const getLineFunction = (point1: TCoord, point2: TCoord) => {
    const k =
        point1.x === point2.x ? 0 : point1.y === point2.y ? 200000000 : (point1.y - point2.y) / (point1.x - point2.x)
    const b = point1.y - k * point1.x
    return {
        k,
        b,
        point1,
        point2,
    }
}

export const modifyLineFunctions = (line: TLine) => {
    line.b = line.point1.y - line.k * line.point1.x
    return line
}

export const getKLineFunction = (point1: TCoord, point2: TCoord): number => {
    return point1.x === point2.x ? 0 : (point1.y - point2.y) / (point1.x - point2.x)
}

export const getLineFunctionWithK = (point1: TCoord, point2: TCoord, k: number) => {
    const b = point1.y - k * point1.x
    return {
        k,
        b,
        point1,
        point2,
    }
}

const getMinMax = (points: IPointSpace[]): IMinMaxHelp => {
    return points.reduce(
        (old, point) => {
            if (old.min.x > point.point.x) {
                old.min.x = point.point.x
            }
            if (old.min.y > point.point.y) {
                old.min.y = point.point.y
            }
            if (old.max.x < point.point.x) {
                old.max.x = point.point.x
            }
            if (old.max.y < point.point.y) {
                old.max.y = point.point.y
            }
            return old
        },
        { min: { x: points[0].point.x, y: points[0].point.y }, max: { x: points[0].point.x, y: points[0].point.y } }
    )
}
