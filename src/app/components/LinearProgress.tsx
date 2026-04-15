import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'

interface Props {
    open: number
    progress: number
    review: number
    done: number
    error: number
    closed: number
    deleted: number
    tiny?: boolean
}

export const LinearProgress: React.FC<Props> = ({ tiny, open, progress, review, done, error, closed, deleted }) => {
    const all = open + progress + review + done + error + closed + deleted
    const rv = (100 * review) / all
    const rp = Math.floor((100 * review) / all)
    const er = (100 * error) / all + rv
    const ep = Math.floor((100 * error) / all)
    const dn = (100 * done) / all + er
    const dp = Math.floor((100 * done) / all)
    const pr = (100 * progress) / all + dn
    const pp = Math.floor((100 * progress) / all)

    const [isDetail, setDetail] = useState(false)

    const handleClick = () => {
        setDetail((value) => !value)
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: tiny ? '2px' : isDetail ? '24px' : '8px',
                borderRadius: '8px',
                backgroundColor: '#E1F5FE',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                transition: '0.3s',
            }}
            onClick={handleClick}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: '#2196F3',
                    height: '100%',
                    width: `${pr}%`,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                {isDetail && (
                    <Typography variant="caption" fontWeight={600} sx={{ color: '#fff', mr: 1 }}>{`${pp}%`}</Typography>
                )}
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: '#4CAF50',
                    height: '100%',
                    width: `${dn}%`,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                {isDetail && (
                    <Typography variant="caption" fontWeight={600} sx={{ color: '#fff', mr: 1 }}>
                        {`${dp}%`}
                    </Typography>
                )}
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: '#F44336',
                    height: '100%',
                    width: `${er}%`,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                {isDetail && (
                    <Typography variant="caption" fontWeight={600} sx={{ color: '#fff', mr: 1 }}>
                        {`${ep}%`}
                    </Typography>
                )}
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: '#F57C00',
                    height: '100%',
                    width: `${rv}%`,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                {isDetail && (
                    <Typography variant="caption" fontWeight={600} sx={{ color: '#fff', mr: 1 }}>
                        {`${rp}%`}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}
