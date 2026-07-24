import { Box, CircularProgress, Typography } from '@mui/material'
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend)

interface Props {
    place: 'hrzn' | 'nsns'
    isLoading: boolean
    isLoaded: boolean
    title: string
    description: string
    datasets: number[]
    all?: number[][]
    borderColor: string
    backgroundColor: string
}

export const ViewChart: React.FC<Props> = ({
    isLoading,
    isLoaded,
    title,
    description,
    datasets,
    place,
    borderColor,
    backgroundColor,
}) => {
    const data = {
        labels: datasets,
        datasets: [
            {
                fill: true,
                data: datasets,
                borderColor,
                backgroundColor,
                radius: 0,
            },
        ],
    }
    const min = Math.min(...datasets) / 2

    const options = {
        responsive: true,
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
                min,
            },
        },
        plugins: {
            legend: {
                display: false,
                position: 'top' as const,
            },
            title: {
                display: false,
            },

            datalabels: {
                display: false, // Hides values rendered directly on the chart
            },
        },
    }

    return (
        <Box
            sx={{
                borderRadius: 4,
                border: '1px solid #eee',
                overflow: 'hidden',
                width: '100%',
                heigth: '256px',
                minHeight: '256px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Box
                sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="body1">{title}</Typography>

                    <Box
                        sx={{
                            px: 1,
                            py: 0,
                            borderRadius: '4px',
                            bgcolor: '#E8F5E9',
                            color: '#1B5E20',
                            textTransform: 'uppercase',
                        }}
                    >
                        <Typography variant="caption">{place}</Typography>
                    </Box>
                </Box>
                <Typography variant="body3">{description}</Typography>
            </Box>

            <Box
                sx={{
                    width: 'calc(100% + 0px)',
                }}
            >
                {!isLoading && isLoaded && <Line options={options} data={data} />}
                {isLoading && isLoaded && (
                    <Box mt={4.25} display={'flex'} justifyContent={'center'}>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </Box>
    )
}
