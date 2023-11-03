export const rand = (min: number, max: number, ten = 1, den = 1) => {
    return Math.round((Math.random() * (max - min) + min) * ten) * den
}
