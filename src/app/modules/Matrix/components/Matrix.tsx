import { Avatar, AvatarGroup, Box } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { IMatrix } from 'types/IMatrix'

import { matrixActions } from '../slice'

interface Props {
    matrix: IMatrix
}

export const Matrix: React.FC<Props> = ({ matrix }) => {
    const dispatch = useDispatch()

    const handleOpen = () => {
        dispatch(matrixActions.showModal(matrix.id))
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                borderRadius: '64px',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #546E7A',
                p: '6px',
                flexShrink: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: '0.3s',
                ':hover': {
                    border: '2px solid #546E7A',
                    p: '5px',
                },
            }}
            onClick={handleOpen}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    overflow: 'hidden',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        backgroundColor: matrix.empty ? '#BF360C' : '#546E7A',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 600,
                        fontSize: '20px',
                        flexShrink: 0,
                    }}
                >
                    {matrix.position}
                </Box>
                <Box
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {matrix.name}
                </Box>
            </Box>

            {matrix.blocks.length > 0 && (
                <AvatarGroup max={4} spacing={16}>
                    {matrix.blocks.slice(0, 4).map((block, index) => (
                        <Avatar
                            key={index}
                            alt={`${block.author?.last_name} ${block.author?.name}`}
                            src={block.author?.avatar?.thumb}
                            sx={{ width: 32, height: 32 }}
                        />
                    ))}
                </AvatarGroup>
            )}
        </Box>
    )
}
