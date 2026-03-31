import { LoadingButton } from '@mui/lab'
import { Box, Container, Typography } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { AvatarImage } from 'app/modules/Profile/components/AvatarImage'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'

import { matrixActions } from '../slice'
import { selectMatrixById, selectModal, selectStatus } from '../slice/selectors'

export const MatrixView: React.FC = () => {
    const dispatch = useDispatch()

    const { stock, empty } = useSelector(selectStatus)
    const { activeId, isOpen } = useSelector(selectModal)
    const getMatrix = useSelector(selectMatrixById)
    const matrix = getMatrix(activeId)
    const checkStatickRole = useSelector(selectCheckAccess)

    const handleClose = () => {
        dispatch(matrixActions.hideModal())
    }

    const handleEmpty = () => {
        dispatch(matrixActions.empty(activeId))
    }

    const handleStock = () => {
        dispatch(matrixActions.stock(activeId))
    }

    return (
        <Modal
            open={isOpen}
            title={matrix?.id ? `${matrix.position} Матрица` : 'Открываем матрицу'}
            handleClose={handleClose}
        >
            <Box
                py={10}
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                    maxHeight: 'calc( 100% )',
                }}
            >
                <Container>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            pt: 0,
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: '4px',
                                bgcolor: matrix?.empty ? '#BF360C' : '#2E7D32',
                                borderRadius: 2,
                            }}
                        ></Box>

                        <Box>
                            <Typography variant="caption">Номер</Typography>
                            <Typography variant="h2" color={matrix?.empty ? '#BF360C' : '#2E7D32'}>
                                {matrix?.position}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="caption">Название</Typography>
                            <Typography variant="h5">{matrix?.name}</Typography>
                        </Box>

                        {matrix && matrix?.blocks.length > 0 && (
                            <Box>
                                <Typography variant="caption">Кто заказал</Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                    }}
                                >
                                    {matrix.blocks.map((block, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                gap: 1,
                                                alignItems: 'center',
                                                p: 1,
                                                border: '1px solid #ECEFF1',
                                                borderRadius: '48px',
                                            }}
                                        >
                                            <AvatarImage
                                                size={32}
                                                image={block.author?.avatar?.thumb}
                                                name={`${block.author?.last_name} ${block.author?.name}`}
                                            />

                                            <Typography variant="body2">{`${block.author?.last_name} ${block.author?.name}`}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Container>
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    bottom: '4px',
                    right: 0,
                    m: 1,
                    p: 1,
                    borderRadius: 8,
                    backdropFilter: 'blur(4px)',
                    bgcolor: '#FDFDFD30',
                    border: '1px solid #F5F5F5',
                    zIndex: 2,
                    display: 'flex',
                    gap: 1,
                }}
            >
                {matrix && matrix?.blocks.length > 0 && checkStatickRole('update_matrix') && (
                    <LoadingButton
                        color="success"
                        variant="contained"
                        sx={{ borderRadius: 8 }}
                        loading={stock === EStatus.PENDING}
                        onClick={handleStock}
                    >
                        В наличии
                    </LoadingButton>
                )}

                <LoadingButton
                    color="error"
                    variant="contained"
                    sx={{ borderRadius: 8 }}
                    loading={empty === EStatus.PENDING}
                    onClick={handleEmpty}
                >
                    В заказ
                </LoadingButton>
            </Box>
        </Modal>
    )
}
