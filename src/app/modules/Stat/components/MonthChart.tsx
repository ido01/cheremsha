import { Box } from '@mui/material'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { IStatType } from 'types/IStat'

import { optionsChart } from '../constants'
import { selectStats } from '../slice/selectors'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const colors = [
    {
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
    },
    {
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
    {
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
    },
    {
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
    },
    {
        borderColor: 'rgba(0, 229, 255, 1)',
        backgroundColor: 'rgba(0, 229, 255, 0.5)',
    },
]

interface Props {
    type: IStatType
    title: string
}

export const MonthChart: React.FC<Props> = ({ type, title }) => {
    const allStats = useSelector(selectStats)
    const stats = allStats.filter((stat) => stat.type === type)

    const month = useMemo(() => {
        const month: string[] = []
        stats.forEach((stat) => {
            if (month.findIndex((m) => m === stat.month) === -1) {
                month.push(stat.month)
            }
        })
        return month
    }, [stats])

    const data = useMemo(() => {
        const labels = [
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '00',
            '01',
            '02',
            '03',
            '04',
        ]

        const charts = month.map((m, index) => {
            const colorIndex = index % colors.length
            return {
                value: m,
                label: m,
                borderColor: colors[colorIndex].borderColor,
                backgroundColor: colors[colorIndex].backgroundColor,
            }
        })

        return {
            labels: labels.map((label) => `${label}:00`),
            datasets: charts.map((chart) => {
                const items = stats.filter((stat) => stat.month === chart.value)
                const itemsData = new Array(17).fill(0)
                const itemsCount = new Array(17).fill(0)
                items.forEach((stat) => {
                    itemsData[stat.hour - 12] += stat.count
                    itemsCount[stat.hour - 12]++
                })
                itemsData.forEach((count, index) => {
                    itemsData[index] = count / itemsCount[index]
                })
                return {
                    label: chart.label,
                    data: itemsData,
                    borderColor: chart.borderColor,
                    backgroundColor: chart.backgroundColor,
                }
            }),
        }
    }, [stats, month])

    return (
        <Box
            sx={{
                maxHeight: 'calc( 100vh - 256px )',
                height: '600px',
            }}
        >
            <Line
                data={data}
                options={{
                    ...optionsChart,
                    plugins: {
                        title: {
                            display: true,
                            text: title,
                        },
                    },
                }}
            />
        </Box>
    )
}
