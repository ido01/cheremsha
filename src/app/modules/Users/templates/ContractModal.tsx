import { Edit as EditIcon } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Container, IconButton, Typography } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { TextAreaEdit } from 'app/modules/Documents/components/TextAreaEdit'
import { selectCheckAccess } from 'app/modules/Role/selectors'
import { useFormik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import * as yup from 'yup'

import { usersActions } from '../slice'
import { selectModal, selectUserById } from '../slice/selectors'

export const ContractModal: React.FC = () => {
    const dispatch = useDispatch()

    const [isEdit, setEdit] = useState(false)
    const { isOpenContract, status, activeId } = useSelector(selectModal)
    const getUser = useSelector(selectUserById)
    const user = getUser(activeId)
    const checkStatickRole = useSelector(selectCheckAccess)

    const data = useMemo(() => {
        if (!user) {
            return {
                contract: '',
            }
        }
        return {
            contract: user.contract || '',
        }
    }, [user])

    const handleClose = () => {
        dispatch(usersActions.hideContractModal())
    }

    useEffect(() => {
        setEdit(false)
    }, [isOpenContract])

    const handleEditContract = () => {
        setEdit(true)
    }

    const handleCloseEdit = () => {
        setEdit(false)
    }

    const validationSchema = yup.object({
        contract: yup.string(),
    })

    const formik = useFormik({
        validationSchema,
        initialValues: data,
        validateOnBlur: true,
        validateOnChange: true,
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(
                usersActions.updateContract({
                    ...values,
                    id: activeId,
                })
            )
            setEdit(false)
        },
    })

    return (
        <>
            <Modal
                pl={1}
                open={isOpenContract}
                small
                title={
                    <Box display={'flex'} alignItems={'center'}>
                        <Typography variant="h5" sx={{ mx: 1 }}>
                            Договор
                        </Typography>
                    </Box>
                }
                handleClose={handleClose}
            >
                <Box
                    noValidate
                    component="form"
                    onSubmit={(e: React.FormEvent) => {
                        e.preventDefault()

                        formik.handleSubmit()
                    }}
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
                        {!isEdit && user && user.contract && (
                            <Typography variant="body1">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: user?.contract,
                                    }}
                                />
                            </Typography>
                        )}

                        {isEdit && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0,
                                }}
                            >
                                <Typography variant="caption">Описание</Typography>
                                <TextAreaEdit
                                    value={formik.values.contract}
                                    onChange={(e) => {
                                        formik.setFieldValue('contract', e)
                                    }}
                                />
                            </Box>
                        )}

                        {checkStatickRole('contract_update') && !isEdit && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: '4px',
                                    left: 0,
                                    m: 1,
                                    p: 1,
                                    borderRadius: 8,
                                    backdropFilter: 'blur(4px)',
                                    bgcolor: '#FDFDFD30',
                                    boxShadow: '0px 4px 4px #3332',
                                }}
                            >
                                <Box display={'flex'} gap={1}>
                                    <IconButton color="info" onClick={handleEditContract} sx={{ bgcolor: '#FDFDFD90' }}>
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        )}

                        {checkStatickRole('contract_update') && isEdit && (
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
                                    display: 'flex',
                                    gap: 1,
                                }}
                            >
                                <LoadingButton
                                    color="error"
                                    variant="outlined"
                                    onClick={handleCloseEdit}
                                    sx={{ borderRadius: 8 }}
                                >
                                    Отменить
                                </LoadingButton>

                                <LoadingButton
                                    loading={status === EStatus.PENDING}
                                    color="success"
                                    variant="outlined"
                                    onClick={() => formik.handleSubmit()}
                                    sx={{ borderRadius: 8 }}
                                >
                                    Сохранить
                                </LoadingButton>
                            </Box>
                        )}
                    </Container>
                </Box>
            </Modal>
        </>
    )
}
