import { Box, Container } from '@mui/material'
import { Main } from 'app/modules/Layout/templates/Main'
import React, { useMemo } from 'react'

import { Chip } from '../components/Chip'
import { Stat } from '../components/Requests/Stat'
import { ChartProps } from '../slice/types'

const charts: ChartProps[] = [
    {
        id: 1,
        title: 'Кальяны',
        description: 'Динамика по месяцам',
        place: 'hrzn',
        period: 'month',
        result: 'floor',
        type: 'hook',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        id: 2,
        title: 'Кальяны',
        description: 'Динамика по дням за месяц',
        place: 'hrzn',
        period: 'day',
        result: 'floor',
        type: 'hook',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        id: 3,
        title: 'Кальяны',
        description: 'Динамика по часам(месяц)',
        place: 'hrzn',
        period: 'hour',
        result: 'floor',
        type: 'hook',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        id: 4,
        title: 'Столы',
        description: 'Динамика по месяцам',
        place: 'hrzn',
        period: 'month',
        result: 'floor',
        type: 'new',
        borderColor: '#009688',
        backgroundColor: '#E0F2F1',
    },
    {
        id: 5,
        title: 'Столы',
        description: 'Динамика по дням за месяц',
        place: 'hrzn',
        period: 'day',
        result: 'floor',
        type: 'new',
        borderColor: '#009688',
        backgroundColor: '#E0F2F1',
    },
    {
        id: 6,
        title: 'Столы',
        description: 'Динамика по часам(месяц)',
        place: 'hrzn',
        period: 'hour',
        result: 'floor',
        type: 'new',
        borderColor: '#009688',
        backgroundColor: '#E0F2F1',
    },
    {
        id: 7,
        title: 'Церемонии',
        description: 'Динамика по месяцам',
        place: 'hrzn',
        period: 'month',
        result: 'floor',
        type: 'tea',
        borderColor: '#FFA726',
        backgroundColor: '#FFF3E0',
    },
    {
        id: 8,
        title: 'Церемонии',
        description: 'Динамика по дням за месяц',
        place: 'hrzn',
        period: 'day',
        result: 'floor',
        type: 'tea',
        borderColor: '#FFA726',
        backgroundColor: '#FFF3E0',
    },
    {
        id: 9,
        title: 'Церемонии',
        description: 'Динамика по часам(месяц)',
        place: 'hrzn',
        period: 'hour',
        result: 'floor',
        type: 'tea',
        borderColor: '#FFA726',
        backgroundColor: '#FFF3E0',
    },
    {
        id: 10,
        title: 'Кальяны',
        description: 'Динамика по месяцам',
        place: 'nsns',
        period: 'month',
        result: 'floor',
        type: 'hook',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        id: 11,
        title: 'Кальяны',
        description: 'Динамика по дням за месяц',
        place: 'nsns',
        period: 'day',
        result: 'floor',
        type: 'hook',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        id: 12,
        title: 'Кальяны',
        description: 'Динамика по часам(месяц)',
        place: 'nsns',
        period: 'hour',
        result: 'floor',
        type: 'hook',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        id: 13,
        title: 'Столы',
        description: 'Динамика по месяцам',
        place: 'nsns',
        period: 'month',
        result: 'floor',
        type: 'new',
        borderColor: '#009688',
        backgroundColor: '#E0F2F1',
    },
    {
        id: 14,
        title: 'Столы',
        description: 'Динамика по дням за месяц',
        place: 'nsns',
        period: 'day',
        result: 'floor',
        type: 'new',
        borderColor: '#009688',
        backgroundColor: '#E0F2F1',
    },
    {
        id: 15,
        title: 'Столы',
        description: 'Динамика по часам(месяц)',
        place: 'nsns',
        period: 'hour',
        result: 'floor',
        type: 'new',
        borderColor: '#009688',
        backgroundColor: '#E0F2F1',
    },
    {
        id: 16,
        title: 'Церемонии',
        description: 'Динамика по месяцам',
        place: 'nsns',
        period: 'month',
        result: 'floor',
        type: 'tea',
        borderColor: '#FFA726',
        backgroundColor: '#FFF3E0',
    },
    {
        id: 17,
        title: 'Церемонии',
        description: 'Динамика по дням за месяц',
        place: 'nsns',
        period: 'day',
        result: 'floor',
        type: 'tea',
        borderColor: '#FFA726',
        backgroundColor: '#FFF3E0',
    },
    {
        id: 18,
        title: 'Церемонии',
        description: 'Динамика по часам(месяц)',
        place: 'nsns',
        period: 'hour',
        result: 'floor',
        type: 'tea',
        borderColor: '#FFA726',
        backgroundColor: '#FFF3E0',
    },
]

const places = [
    {
        label: 'Все',
        value: 'all',
    },
    {
        label: 'Hrzn',
        value: 'hrzn',
    },
    {
        label: 'Nsns',
        value: 'nsns',
    },
]

const periods = [
    {
        label: 'Все',
        value: 'all',
    },
    {
        label: 'Месяц',
        value: 'month',
    },
    {
        label: 'День',
        value: 'day',
    },
    {
        label: 'Час',
        value: 'hour',
    },
]

const types = [
    {
        label: 'Все',
        value: 'all',
    },
    {
        label: 'Столы',
        value: 'new',
    },
    {
        label: 'Кальяны',
        value: 'hook',
    },
    {
        label: 'Церемонии',
        value: 'tea',
    },
]

export const StatList: React.FC = () => {
    const [place, setPlace] = React.useState<string | null>('all')
    const [period, setPeriod] = React.useState<string | null>('all')
    const [type, setType] = React.useState<string | null>('all')

    const chartsFiltered = useMemo(() => {
        return charts
            .filter((chart) => place === 'all' || chart.place === place)
            .filter((chart) => period === 'all' || chart.period === period)
            .filter((chart) => type === 'all' || chart.type === type)
    }, [place, period, type])

    return (
        <Main title={'Статистика заведения'} searchDisabled={true}>
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: {
                                xs: 1,
                                md: 3,
                            },
                            flexDirection: {
                                xs: 'column',
                                md: 'row',
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                            }}
                        >
                            {places.map((item, index) => (
                                <Chip key={index} {...item} active={place === item.value} onClick={setPlace} />
                            ))}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                            }}
                        >
                            {types.map((item, index) => (
                                <Chip key={index} {...item} active={type === item.value} onClick={setType} />
                            ))}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                            }}
                        >
                            {periods.map((item, index) => (
                                <Chip key={index} {...item} active={period === item.value} onClick={setPeriod} />
                            ))}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            rowGap: 1,
                            columnGap: 1,
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: '1fr 1fr',
                                md: '1fr 1fr 1fr 1fr',
                            },
                            pb: 11,
                        }}
                    >
                        {chartsFiltered.map((chart) => (
                            <Stat key={chart.id} {...chart} />
                        ))}
                    </Box>
                </Box>
            </Container>
        </Main>
    )
}
