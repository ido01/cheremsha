import { Box } from '@mui/material'
import React from 'react'

import { ITable, ITime } from '../types'
import { AddReservation } from './AddReservation'
import { ReservationItem } from './ReservationItem'

export const TableTimeline: React.FC<{
    count: number
    heightItem: number
    width: number
    table: ITable
    timeLines: number[]
    scrollPosition: number
}> = ({ table, heightItem, width, timeLines, count, scrollPosition }) => {
    const minWidth = width / 30
    const countItems = count * 2

    const times: { left: number; time: ITime }[] = []

    for (let index = 0; index < countItems; index++) {
        const hour = (12 + Math.floor(index / 2)) % 24
        const minute = index % 2 ? 30 : 0
        times.push({
            left: width * (index + 1),
            time: {
                hour,
                minute,
            },
        })
    }

    return (
        <Box
            sx={{
                borderBottom: '1px solid #eee',
                width: '100%',
                height: `${heightItem}px`,
                p: 1,
                px: `${width}px`,
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    width: `${width}px`,
                    position: 'absolute',
                    height: `${heightItem}px`,
                    top: 0,
                    left: `${0}px`,
                    backgroundColor: '#f9f9f9',
                }}
            ></Box>
            {timeLines.length > 0 && (
                <Box
                    sx={{
                        width: `${width}px`,
                        position: 'absolute',
                        height: `${heightItem}px`,
                        top: 0,
                        left: `${timeLines[timeLines.length - 1]}px`,
                        backgroundColor: '#f9f9f9',
                    }}
                ></Box>
            )}
            {timeLines.map((left, index) => (
                <Box
                    key={index}
                    sx={{
                        width: '1px',
                        position: 'absolute',
                        height: `${heightItem}px`,
                        top: 0,
                        left: `${left}px`,
                        backgroundColor: '#ddd',
                    }}
                ></Box>
            ))}

            {times.map((time, index) => (
                <AddReservation key={index} left={time.left} width={width} heightItem={heightItem} time={time.time} />
            ))}

            {table.reservations.map((reservation, index) => (
                <ReservationItem
                    key={`reservation_${index}`}
                    reservation={reservation}
                    minWidth={minWidth}
                    heightItem={heightItem}
                    scrollPosition={scrollPosition}
                />
            ))}
        </Box>
    )
}
