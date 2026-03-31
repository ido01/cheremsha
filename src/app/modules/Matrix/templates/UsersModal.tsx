import { LoadingButton } from '@mui/lab'
import { Box, Container, Typography } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { selectCategoryById } from 'app/modules/Categories/slice/selectors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { User } from '../components/User'
import { matrixActions } from '../slice'
import { selectuserModal } from '../slice/selectors'
import { FindModal } from './FindModal'

export const UsersModal: React.FC = () => {
    const dispatch = useDispatch()

    const { isOpen, activeId } = useSelector(selectuserModal)
    const getCategory = useSelector(selectCategoryById)
    const category = getCategory(activeId || '0')

    const handleClose = () => {
        dispatch(matrixActions.hideUserModal())
    }

    const handleFind = () => {
        dispatch(matrixActions.openFindModal(activeId))
    }

    return (
        <Modal open={isOpen} title={'Получатели списка'} handleClose={handleClose}>
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
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                pt: 2,
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <LoadingButton
                                color="success"
                                variant="contained"
                                sx={{ borderRadius: 8 }}
                                onClick={handleFind}
                            >
                                Добавить получателя
                            </LoadingButton>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                pt: 0,
                            }}
                        >
                            {category && category?.observers.length > 0 && (
                                <Box>
                                    <Typography variant="caption">Кому можно отправить список</Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1,
                                        }}
                                    >
                                        {category?.observers.map((block) => (
                                            <User key={block.id} block={block} isDelete />
                                        ))}
                                    </Box>
                                </Box>
                            )}
                        </Box>
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
                {/* {matrix && matrix?.blocks.length > 0 && checkStatickRole('update_matrix') && (
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
                </LoadingButton> */}
            </Box>

            <FindModal />
        </Modal>
    )
}
