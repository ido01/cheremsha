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

export const AllChart: React.FC = () => {
    const stats = useSelector(selectStats)

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
        const reserv = stats.filter((stat) => stat.type === 'reserv')
        const reservData = new Array(17).fill(0)
        const reservCount = new Array(17).fill(0)
        reserv.forEach((stat) => {
            reservData[stat.hour - 12] += stat.count
            reservCount[stat.hour - 12]++
        })
        reservData.forEach((count, index) => {
            reservData[index] = count / reservCount[index]
        })

        const hook = stats.filter((stat) => stat.type === 'hook')
        const hookData = new Array(17).fill(0)
        const hookCount = new Array(17).fill(0)
        hook.forEach((stat) => {
            hookData[stat.hour - 12] += stat.count
            hookCount[stat.hour - 12]++
        })
        hookData.forEach((count, index) => {
            hookData[index] = count / hookCount[index]
        })

        const tea = stats.filter((stat) => stat.type === 'tea')
        const teaData = new Array(17).fill(0)
        const teaCount = new Array(17).fill(0)
        tea.forEach((stat) => {
            teaData[stat.hour - 12] += stat.count
            teaCount[stat.hour - 12]++
        })
        teaData.forEach((count, index) => {
            teaData[index] = count / teaCount[index]
        })

        return {
            labels: labels.map((label) => `${label}:00`),
            datasets: [
                {
                    label: 'Занятые столы',
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
                            text: 'Усредненные показатели',
                        },
                    },
                }}
            />
        </Box>
    )
}
