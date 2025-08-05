import { Box, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

import { ITableTime } from '../types'

export const ReservationItem: React.FC<{
    reservation: ITableTime
    minWidth: number
    heightItem: number
    scrollPosition: number
}> = ({ reservation, minWidth, heightItem, scrollPosition }) => {
    const ref = useRef<HTMLElement>(null)
    const [isNameFixed, setNameFixed] = useState(false)
    const itemHeight = heightItem - 8
    let startHour = reservation.start.hour - 12
    let endHour = reservation.end.hour - 12
    if (startHour < 0) {
        startHour += 24
    }
    if (endHour < 0) {
        endHour += 24
    }
    const start = (startHour * 60 + reservation.start.minute + 30) * minWidth + 4
    const end = (endHour * 60 + reservation.end.minute + 30) * minWidth - 4 - start

    useEffect(() => {
        if (!isNameFixed && scrollPosition > start && scrollPosition - start < end) {
            setNameFixed(true)
        } else if (isNameFixed) {
            setNameFixed(false)
        }
    }, [scrollPosition, start, end])

    return (
        <Box
            ref={ref}
            sx={{
                position: 'absolute',
                width: `${end}px`,
                top: '4px',
                borderRadius: 2,
                backgroundColor: '#8BC34A',
                height: `${itemHeight}px`,
                left: `${start}px`,
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    color: '#FFF',
                    lineHeight: `${itemHeight}px`,
                    pl: 1,
                    position: isNameFixed ? 'fixed' : 'block',
                    left: isNameFixed ? '10px' : 0,
                }}
            >
                {reservation.name}
            </Typography>
        </Box>
    )
}
