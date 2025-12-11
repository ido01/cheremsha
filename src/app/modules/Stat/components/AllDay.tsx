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

import { optionsChart } from '../constants'
import { selectStats } from '../slice/selectors'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface Props {
    title: string
}

export const AllDay: React.FC<Props> = ({ title }) => {
    const stats = useSelector(selectStats)

    const labels = useMemo(() => {
        const days: string[] = []
        stats.forEach((stat) => {
            if (days.findIndex((m) => m === stat.date) === -1) {
                days.push(stat.date)
            }
        })
        return days
    }, [stats])

    const data = useMemo(() => {
        const reserv = stats.filter((stat) => stat.type === 'new')
        const reservData = new Array(labels.length).fill(0)
        reserv.forEach((stat) => {
            reservData[labels.findIndex((m) => m === stat.date)] += stat.count
        })

        const hook = stats.filter((stat) => stat.type === 'hook')
        const hookData = new Array(labels.length).fill(0)
        hook.forEach((stat) => {
            hookData[labels.findIndex((m) => m === stat.date)] += stat.count
        })

        const tea = stats.filter((stat) => stat.type === 'tea')
        const teaData = new Array(labels.length).fill(0)
        tea.forEach((stat) => {
            teaData[labels.findIndex((m) => m === stat.date)] += stat.count
        })

        return {
            labels,
            datasets: [
                {
                    label: 'Новые столы',
                    data: reservData,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                    label: 'Кальяны',
                    data: hookData,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
                {
                    label: 'Церемония',
                    data: teaData,
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.5)',
                },
            ],
        }
    }, [stats, labels])

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
