import React, { useEffect, useState } from 'react'
import { IStatsResponse } from 'types/IStat'
import { request } from 'utils/request'

import { ChartProps } from '../../slice/types'
import { ViewChart } from '../ViewChart'

export const Stat: React.FC<ChartProps> = ({
    place,
    type,
    period,
    title,
    description,
    result,
    borderColor,
    backgroundColor,
}) => {
    const [data, setData] = useState<number[]>([])
    const [isLoading, setLoading] = useState(false)
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        if (isLoading || isLoaded) return

        setLoading(true)
        request(`stats/${period}/${result}/${type}/${place}`).then((response: IStatsResponse) => {
            setData(response.data)
            setLoading(false)
            setLoaded(true)
        })
    }, [isLoaded, isLoading, place, type])

    return (
        <ViewChart
            place={place}
            datasets={data}
            title={title}
            description={description}
            isLoading={isLoading}
            isLoaded={isLoaded}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
        />
    )
}
