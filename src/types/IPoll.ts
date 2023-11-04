export type IPollsResponse = {
    title: string
    questions: IPollQuestion[]
}

export interface IPollVariant {
    id: string
    text: string
    count: number
}

export interface IPollQuestion {
    id: string
    text: string
    count: number
    sort: number
    variants: IPollVariant[]
}
