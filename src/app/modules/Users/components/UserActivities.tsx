import { Box, Grid, Tooltip, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import { IUser } from 'types/IUser'

interface Props {
    user: IUser
}

export const UserActivities: React.FC<Props> = ({ user }) => {
    const activities = user.activities || []
    let now = dayjs()
    const data = useMemo(() => {
        const data = []
        for (let i = 0; i < 500; i++) {
            const week = []
            for (let j = 0; j < 7; j++) {
                const data = now.locale('ru').format('YYYY-MM-DD')
                const activity = activities.find((a) => a.day === data)
                const count = activity && activity.count ? activity.count : 0
                week.push({
                    day: now.locale('ru').format('D MMM YYYY'),
                    count,
                })
                now = now.subtract(1, 'day')
            }
            data.push(week)
        }
        return data
    }, [])
    return (
        <Grid item xs={12}>
            <Box
                sx={{
                    width: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                    height: '68px',
                    mb: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        flexDirection: 'row-reverse',
                        gap: '2px',
                        position: 'absolute',
                        right: 0,
                    }}
                >
                    {data.map((week, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column-reverse',
                                gap: '2px',
                            }}
                        >
                            {week.map((day, i) => (
                                <Tooltip
                                    key={`${index}_${i}`}
                                    title={
                                        <Box display={'flex'} flexDirection={'column'}>
                                            <Typography variant="caption">{day.day}</Typography>
                                            <Typography variant="caption">Активность: {day.count}</Typography>
                                        </Box>
                                    }
                                >
                                    <Box
                                        sx={{
                                            width: '8px',
                                            height: '8px',
                                            bgcolor:
                                                day.count > 500
                                                    ? '#00897B'
                                                    : day.count > 300
                                                    ? '#009688'
                                                    : day.count > 200
                                                    ? '#26A69A'
                                                    : day.count > 100
                                                    ? '#4DB6AC'
                                                    : day.count > 50
                                                    ? '#80CBC4'
                                                    : day.count
                                                    ? '#B2DFDB'
                                                    : '#ECEFF1',
                                        }}
                                    ></Box>
                                </Tooltip>
                            ))}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Grid>
    )
}
