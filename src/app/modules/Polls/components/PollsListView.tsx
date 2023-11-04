import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

import { selectPolls } from '../slice/selectors'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

export const PollsListView: React.FC = () => {
    const polls = useSelector(selectPolls)
    return (
        <Box pt={4}>
            {polls.map((poll) => {
                const options = {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top' as const,
                        },
                        title: {
                            display: false,
                            text: '',
                        },
                    },
                }
                const bgcolors = [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ]
                const data = {
                    labels: poll.variants.map((variant) => variant.text),
                    datasets: [
                        {
                            label: 'Голосов',
                            data: poll.variants.map((variant) => variant.count),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                }
                const barData = {
                    labels: ['Количество'],
                    datasets: poll.variants.map((variant, i) => ({
                        label: variant.text,
                        data: [variant.count],
                        backgroundColor: bgcolors[i],
                    })),
                }
                return (
                    <Accordion key={poll.id} defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>
                                <b>Вопрос {poll.sort}:</b> {poll.text}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {poll.variants.length <= 4 ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Box sx={{ maxWidth: poll.variants.length <= 4 ? 712 : '100%' }}>
                                        <Pie data={data} />
                                    </Box>
                                </Box>
                            ) : (
                                <Bar options={options} data={barData} />
                            )}
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </Box>
    )
}
