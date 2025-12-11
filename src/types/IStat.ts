export type IStatType = 'reserv' | 'hook' | 'tea' | 'new'

export interface IStat {
    id: string
    date: string
    month: string
    day: number
    hour: number
    count: number
    type: IStatType
}

export type IStatsCollectionResponse = {
    data: IStat[]
}
