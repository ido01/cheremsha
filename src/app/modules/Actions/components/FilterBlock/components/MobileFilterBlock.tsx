import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { actionsActions } from 'app/modules/Actions/slice'
import { selectFilter } from 'app/modules/Actions/slice/selectors'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface MobileFilterBlockProps {
    open: boolean
    onClose: () => void
}

export const MobileFilterBlock: React.FC<MobileFilterBlockProps> = ({ open, onClose }) => {
    const dispatch = useDispatch()

    const filter = useSelector(selectFilter)

    const formik = useFormik({
        initialValues: filter,
        validateOnBlur: false,
        validateOnChange: false,
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(actionsActions.setFilter(values))
            onClose()
        },
    })

    return (
        <Modal open={open} title={'Фильтр'} handleClose={onClose}>
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
                    <Stack spacing={5}>
                        <FormControl variant="standard">
                            <InputLabel>Метод</InputLabel>
                            <Select
                                value={filter.method}
                                label="Метод"
                                onChange={(e) => {
                                    const { value } = e.target

                                    dispatch(
                                        actionsActions.setFilter({
                                            ...filter,
                                            method: value,
                                        })
                                    )
                                }}
                            >
                                {[
                                    {
                                        label: 'Все',
                                        value: '',
                                    },
                                    {
                                        label: 'GET',
                                        value: 'GET',
                                    },
                                    {
                                        label: 'POST',
                                        value: 'POST',
                                    },
                                    {
                                        label: 'PATCH',
                                        value: 'PATCH',
                                    },
                                    {
                                        label: 'DELETE',
                                        value: 'DELETE',
                                    },
                                ].map((gender, index) => (
                                    <MenuItem key={index} value={gender.value}>
                                        {gender.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </Container>
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    bottom: 0,
                    py: 2,
                    bgcolor: 'white',
                    zIndex: 1,
                }}
            >
                <Container>
                    <Button fullWidth color="success" variant="contained" onClick={() => formik.handleSubmit()}>
                        Применить фильтр
                    </Button>
                </Container>
            </Box>
        </Modal>
    )
}
