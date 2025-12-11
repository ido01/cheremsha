import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Container, Tab } from '@mui/material'
import { Main } from 'app/modules/Layout/templates/Main'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { AllChart } from '../components/AllChart'
import { AllDay } from '../components/AllDay'
import { AllMonth } from '../components/AllMonth'
import { AverageMonth } from '../components/AverageMonth'
import { MonthChart } from '../components/MonthChart'
import { WeekChart } from '../components/WeekChart'
import { statsActions } from '../slice'

export const StatList: React.FC = () => {
    const dispatch = useDispatch()

    const [value, setValue] = useState<string>('all')

    useEffect(() => {
        dispatch(statsActions.loadStat())
    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    return (
        <Main title={'Статистика заведения'} searchDisabled={true}>
            <Container>
                <Box sx={{ pb: 11 }}>
                    <TabContext value={value}>
                        <TabList onChange={handleChange}>
                            <Tab label="Общая статистика" value="all" sx={{ px: 3 }} />
                            <Tab label="Столы" value="reserv" sx={{ px: 3 }} />
                            <Tab label="Кальяны" value="hook" sx={{ px: 3 }} />
                            <Tab label="Церемонии" value="tea" sx={{ px: 3 }} />
                        </TabList>
                        <TabPanel value="all" sx={{ p: 0 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12,
                                    pb: 1.5,
                                }}
                            >
                                <AverageMonth title="Средние показатели по месяцам" />
                                <AllMonth title="Полные показатели по месяцам" />
                                <AllDay title="Полные показатели по дням" />
                                <AllChart />
                            </Box>
                        </TabPanel>
                        <TabPanel value="reserv" sx={{ p: 0 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12,
                                    pb: 1.5,
                                }}
                            >
                                <MonthChart title="Динамика занятых столов по месяцам" type="reserv" />
                                <MonthChart title="Динамика новых столов по месяцам" type="new" />
                                <WeekChart title="Занятые столы по дням недели" type="reserv" />
                                <WeekChart title="Новые столы по дням недели" type="new" />
                            </Box>
                        </TabPanel>
                        <TabPanel value="hook" sx={{ p: 0 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12,
                                    pb: 1.5,
                                }}
                            >
                                <MonthChart title="Динамика кальянов по месяцам" type="hook" />
                                <WeekChart title="Кальяны по дням недели" type="hook" />
                            </Box>
                        </TabPanel>
                        <TabPanel value="tea" sx={{ p: 0 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 12,
                                    pb: 1.5,
                                }}
                            >
                                <MonthChart title="Динамика чайных церемоний по месяцам" type="tea" />
                                <WeekChart title="Чайные церемонии по дням недели" type="tea" />
                            </Box>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Container>
        </Main>
    )
}
