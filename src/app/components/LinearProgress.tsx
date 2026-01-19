import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'

interface Props {
    success: number
    progress: number
    error: number
    tiny?: boolean
}

export const LinearProgress: React.FC<Props> = ({ tiny, success, progress, error }) => {
    const pr = success + progress + error
    const er = success + error

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
                    <Typography
                        variant="caption"
                        fontWeight={600}
                        sx={{ color: '#fff', mr: 1 }}
                    >{`${progress}%`}</Typography>
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
                    <Typography
                        variant="caption"
                        fontWeight={600}
                        sx={{ color: '#fff', mr: 1 }}
                    >{`${error}%`}</Typography>
                )}
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: '#4CAF50',
                    height: '100%',
                    width: `${success}%`,
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                {isDetail && (
                    <Typography
                        variant="caption"
                        fontWeight={600}
                        sx={{ color: '#fff', mr: 1 }}
                    >{`${success}%`}</Typography>
                )}
            </Box>
        </Box>
    )
}
