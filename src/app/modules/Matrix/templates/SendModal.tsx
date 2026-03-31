import { Box, Container } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { selectCategoryById } from 'app/modules/Categories/slice/selectors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { User } from '../components/User'
import { matrixActions } from '../slice'
import { selectSend } from '../slice/selectors'
import { FindModal } from './FindModal'

export const SendModal: React.FC = () => {
    const dispatch = useDispatch()

    const { isOpen, activeId } = useSelector(selectSend)
    const getCategory = useSelector(selectCategoryById)
    const category = getCategory(activeId || '0')

    const handleClose = () => {
        dispatch(matrixActions.hideSend())
    }

    return (
        <Modal open={isOpen} title={'Отправить'} handleClose={handleClose}>
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
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                pt: 0,
                            }}
                        >
                            {category && category?.observers.length > 0 && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 1,
                                    }}
                                >
                                    {category?.observers.map((block) => (
                                        <User key={block.id} block={block} isSend />
                                    ))}
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
