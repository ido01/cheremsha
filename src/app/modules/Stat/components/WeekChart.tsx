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

interface Props {
    type: IStatType
    title: string
}

export const WeekChart: React.FC<Props> = ({ type, title }) => {
    const allStats = useSelector(selectStats)
    const stats = allStats.filter((stat) => stat.type === type)

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

        const days = [
            {
                value: 1,
                label: 'Понедельник',
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                value: 2,
                label: 'Вторник',
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                value: 3,
                label: 'Среда',
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
            },
            {
                value: 4,
                label: 'Четверг',
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
            {
                value: 5,
                label: 'Пятница',
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.5)',
            },
            {
                value: 6,
                label: 'Суббота',
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
            },
            {
                value: 7,
                label: 'Воскресенье',
                borderColor: 'rgba(0, 229, 255, 1)',
                backgroundColor: 'rgba(0, 229, 255, 0.5)',
            },
        ]

        return {
            labels: labels.map((label) => `${label}:00`),
            datasets: days.map((day) => {
                const items = stats.filter((stat) => stat.day === day.value)
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
                    label: day.label,
                    data: itemsData,
                    borderColor: day.borderColor,
                    backgroundColor: day.backgroundColor,
                }
            }),
        }
    }, [stats])

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
