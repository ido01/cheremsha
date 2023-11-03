import { rand } from 'utils/rand'

import { ISpaceSize, IStar, IVisibleSpaceSize, TCoord } from '../types/Space'

export const Star = (spacecenter: ISpaceSize): IStar => {
    return {
        center: {
            x: rand(spacecenter.start.x, spacecenter.end.x),
            y: rand(spacecenter.start.y, spacecenter.end.y),
        },
    }
}

export const moveStar = (
    star: IStar,
    center: TCoord,
    speed: TCoord,
    spaceRadius?: number,
    visibleSpace?: IVisibleSpaceSize
): IStar => {
    star.center.x += speed.x
    star.center.y += speed.y
    if (!!spaceRadius && !!visibleSpace) {
        if (
            star.center.x < visibleSpace.min.x ||
            star.center.x > visibleSpace.max.x ||
            star.center.y < visibleSpace.min.y ||
            star.center.y > visibleSpace.max.y
        ) {
            if (star.center.y < center.y - spaceRadius) {
                star.center.y = center.y + spaceRadius
                star.center.x = center.x + center.x - star.center.x
            } else if (star.center.y > center.y + spaceRadius) {
                star.center.y = center.y - spaceRadius
                star.center.x = center.x + center.x - star.center.x
            } else if (star.center.x < center.x - spaceRadius) {
                star.center.x = center.x + spaceRadius
                star.center.y = center.y + center.y - star.center.y
            } else if (star.center.x > center.x + spaceRadius) {
                star.center.x = center.x - spaceRadius
                star.center.y = center.y + center.y - star.center.y
            }
        }
    }

    return star
}

export const drawStar = (
    ctx: CanvasRenderingContext2D,
    star: IStar,
    sprite: HTMLCanvasElement,
    halfStarSize: number
) => {
    ctx.drawImage(sprite, star.center.x - halfStarSize, star.center.y - halfStarSize)
}
