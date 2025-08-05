import React, { useState } from 'react'

import { CurrentTime } from '../components/CurrentTime'
import { ListLayout } from '../components/ListLayout'
import { ScrollBlock } from '../components/ScrollBlock'
import { ScrollList } from '../components/ScrollList'
import { TablesList } from '../components/TablesList'
import { TableTimeline } from '../components/TableTimeline'
import { TimesList } from '../components/TimesList'
import { ITable } from '../types'

const data: ITable[] = [
    {
        id: '1',
        name: '1',
        places: 5,
        reservations: [
            {
                id: '1',
                tid: '1',
                name: 'Anton',
                start: {
                    hour: 12,
                    minute: 0,
                },
                end: {
                    hour: 14,
                    minute: 30,
                },
            },
            {
                id: '1',
                tid: '1',
                name: 'Anton',
                start: {
                    hour: 14,
                    minute: 30,
                },
                end: {
                    hour: 15,
                    minute: 30,
                },
            },
            {
                id: '1',
                tid: '1',
                name: 'Anton',
                start: {
                    hour: 16,
                    minute: 0,
                },
                end: {
                    hour: 18,
                    minute: 0,
                },
            },
            {
                id: '1',
                tid: '1',
                name: 'Anton',
                start: {
                    hour: 20,
                    minute: 0,
                },
                end: {
                    hour: 22,
                    minute: 30,
                },
            },
            {
                id: '1',
                tid: '1',
                name: 'Anton',
                start: {
                    hour: 23,
                    minute: 30,
                },
                end: {
                    hour: 2,
                    minute: 30,
                },
            },
        ],
    },
    {
        id: '2',
        name: '2',
        places: 5,
        reservations: [
            {
                id: '1',
                tid: '1',
                name: 'Anton',
                start: {
                    hour: 12,
                    minute: 0,
                },
                end: {
                    hour: 14,
                    minute: 30,
                },
            },
            {
                id: '1',
                tid: '1',
                name: 'Anton',
                start: {
                    hour: 14,
                    minute: 30,
                },
                end: {
                    hour: 15,
                    minute: 30,
                },
            },
            {
                id: '1',
                tid: '1',
                name: 'Anton',
                start: {
                    hour: 16,
                    minute: 0,
                },
                end: {
                    hour: 18,
                    minute: 0,
                },
            },
            {
                id: '1',
                tid: '1',
                name: 'Anton',
                start: {
                    hour: 20,
                    minute: 0,
                },
                end: {
                    hour: 22,
                    minute: 30,
                },
            },
            {
                id: '1',
                tid: '1',
                name: 'Anton',
                start: {
                    hour: 0,
                    minute: 30,
                },
                end: {
                    hour: 4,
                    minute: 0,
                },
            },
        ],
    },
    {
        id: '3',
        name: '3',
        places: 5,
        reservations: [
            {
                id: '1',
                tid: '1',
                name: 'Миша',
                start: {
                    hour: 22,
                    minute: 0,
                },
                end: {
                    hour: 0,
                    minute: 30,
                },
            },
        ],
    },
    {
        id: '4',
        name: '4',
        places: 5,
        reservations: [
            {
                id: '1',
                tid: '1',
                name: 'Паша',
                start: {
                    hour: 20,
                    minute: 0,
                },
                end: {
                    hour: 23,
                    minute: 0,
                },
            },
            {
                id: '1',
                tid: '1',
                name: 'Паша',
                start: {
                    hour: 23,
                    minute: 0,
                },
                end: {
                    hour: 0,
                    minute: 30,
                },
            },
        ],
    },
    {
        id: '5',
        name: '5',
        places: 5,
        reservations: [
            {
                id: '1',
                tid: '1',
                name: 'Гриша',
                start: {
                    hour: 19,
                    minute: 0,
                },
                end: {
                    hour: 22,
                    minute: 0,
                },
            },
            {
                id: '1',
                tid: '1',
                name: 'Мариша',
                start: {
                    hour: 0,
                    minute: 0,
                },
                end: {
                    hour: 3,
                    minute: 0,
                },
            },
        ],
    },
    {
        id: '6',
        name: '6',
        places: 5,
        reservations: [
            {
                id: '1',
                tid: '1',
                name: 'Паша',
                start: {
                    hour: 21,
                    minute: 30,
                },
                end: {
                    hour: 0,
                    minute: 0,
                },
            },
        ],
    },
    {
        id: '7',
        name: '7',
        places: 5,
        reservations: [
            {
                id: '1',
                tid: '1',
                name: 'Паша',
                start: {
                    hour: 20,
                    minute: 0,
                },
                end: {
                    hour: 23,
                    minute: 0,
                },
            },
            {
                id: '1',
                tid: '1',
                name: 'Паша',
                start: {
                    hour: 23,
                    minute: 0,
                },
                end: {
                    hour: 0,
                    minute: 30,
                },
            },
        ],
    },
    {
        id: '8',
        name: '8',
        places: 5,
        reservations: [
            {
                id: '1',
                tid: '1',
                name: 'Паша',
                start: {
                    hour: 20,
                    minute: 0,
                },
                end: {
                    hour: 22,
                    minute: 0,
                },
            },
            {
                id: '1',
                tid: '1',
                name: 'Паша',
                start: {
                    hour: 22,
                    minute: 30,
                },
                end: {
                    hour: 0,
                    minute: 30,
                },
            },
        ],
    },
    {
        id: '9',
        name: '9',
        places: 5,
        reservations: [],
    },
    {
        id: '10',
        name: '10',
        places: 5,
        reservations: [],
    },
    {
        id: '11',
        name: '11',
        places: 5,
        reservations: [],
    },
    {
        id: '12',
        name: '12',
        places: 5,
        reservations: [],
    },
    {
        id: '13',
        name: '13',
        places: 5,
        reservations: [],
    },
    {
        id: '14',
        name: '14',
        places: 5,
        reservations: [],
    },
    {
        id: '15',
        name: '15',
        places: 5,
        reservations: [],
    },
    {
        id: '16',
        name: '16',
        places: 5,
        reservations: [],
    },
    {
        id: '17',
        name: '17',
        places: 5,
        reservations: [],
    },
]

export const List: React.FC = () => {
    const COUNT_HOURS = 16
    const halfWidth = 100

    const heightItem = (window.innerHeight - 100) / data.length
    const tl: number[] = []

    for (let index = 1; index < 34; index++) {
        tl.push(halfWidth * index)
    }

    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [scrollPosition, setScrollPosition] = useState(0)

    const handleDoubleClick = () => {
        setScrollLeft((value) => value + 1)
    }

    const handleScroll = (scroll: number) => {
        // if (timer) {
        //     clearTimeout(timer)
        // }
        // setTimer(
        //     setTimeout(() => {
        //         setScrollPosition(scroll)
        //     }, 1000)
        // )
    }

    return (
        <ListLayout>
            <TablesList height={heightItem} data={data} />

            <ScrollBlock scrollLeft={scrollLeft} onScroll={handleScroll}>
                <ScrollList width={halfWidth} count={34}>
                    <TimesList count={COUNT_HOURS} width={halfWidth} onDoubleClick={handleDoubleClick} />

                    {data.map((table, index) => (
                        <TableTimeline
                            key={index}
                            heightItem={heightItem}
                            width={halfWidth}
                            table={table}
                            timeLines={tl}
                            count={COUNT_HOURS}
                            scrollPosition={scrollPosition}
                        />
                    ))}
                </ScrollList>

                <CurrentTime width={halfWidth} changeScroll={setScrollLeft} />
            </ScrollBlock>
        </ListLayout>
    )
}
