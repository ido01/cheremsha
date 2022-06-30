import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { Modal } from 'app/components/Modal'
import { usersActions } from 'app/modules/Users/slice'
import { selectFilter } from 'app/modules/Users/slice/selectors'
import { TUserStatus } from 'app/modules/Users/slice/types'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EPosition } from 'types'

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
            dispatch(usersActions.setFilter(values))
            onClose()
        },
    })

    return (
        <Modal open={open} title={'Фильтр'} handleClose={onClose}>
            <Box
                mt={1}
                pb={3}
                sx={(theme) => ({
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                    borderBottom: 1,
                    maxHeight: 'calc( 100% - 117px )',
                    borderColor: theme.palette.grey[300],
                })}
            >
                <Container>
                    <Stack spacing={5}>
                        <FormControl variant="standard">
                            <InputLabel>Должность</InputLabel>
                            <Select
                                value={formik.values.position}
                                label="Должность"
                                onChange={(e) => {
                                    const { value } = e.target

                                    formik.setFieldValue('position', value)
                                }}
                            >
                                {[
                                    {
                                        label: 'Все',
                                        value: '',
                                    },
                                    {
                                        label: 'Продавец',
                                        value: 'seller',
                                    },
                                    {
                                        label: 'Кальянщик',
                                        value: 'hookah',
                                    },
                                    {
                                        label: 'Управляющий',
                                        value: 'manager',
                                    },
                                    {
                                        label: 'Владелец',
                                        value: 'owner',
                                    },
                                    {
                                        label: 'Создатель',
                                        value: 'creator',
                                    },
                                ].map((gender, index) => (
                                    <MenuItem key={index} value={gender.value}>
                                        {gender.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl variant="standard">
                            <InputLabel>Точка</InputLabel>
                            <Select
                                value={formik.values.place_id}
                                label="Точка"
                                onChange={(e) => {
                                    const { value } = e.target

                                    formik.setFieldValue('place_id', value)
                                }}
                            >
                                {[
                                    {
                                        label: 'Все',
                                        value: '',
                                    },
                                    {
                                        value: '1',
                                        label: 'Академ',
                                    },
                                    {
                                        value: '3',
                                        label: 'Виктория',
                                    },
                                    {
                                        value: '4',
                                        label: 'Миасс',
                                    },
                                    {
                                        value: '5',
                                        label: 'Новотроицк',
                                    },
                                    {
                                        value: '7',
                                        label: 'Парковый',
                                    },
                                    {
                                        value: '9',
                                        label: 'Советский',
                                    },
                                    {
                                        value: '10',
                                        label: 'Теплотех',
                                    },
                                    {
                                        value: '11',
                                        label: 'Тополинка',
                                    },
                                    {
                                        value: '13',
                                        label: 'Центр',
                                    },
                                    {
                                        value: '16',
                                        label: 'Чмз',
                                    },
                                    {
                                        value: '19',
                                        label: 'Ленинский',
                                    },
                                    {
                                        value: '20',
                                        label: 'Чтз',
                                    },
                                    {
                                        value: '21',
                                        label: 'ТОРГОВЫЙ',
                                    },
                                    {
                                        value: '22',
                                        label: 'Александровский',
                                    },
                                    {
                                        value: '26',
                                        label: 'Пушкина',
                                    },
                                    {
                                        value: '27',
                                        label: 'Екат Академ',
                                    },
                                    {
                                        value: '28',
                                        label: 'Академический',
                                    },
                                    {
                                        value: '30',
                                        label: 'Ньютон',
                                    },
                                    {
                                        value: '31',
                                        label: 'Миасс Старый',
                                    },
                                    {
                                        value: '32',
                                        label: 'Миасс Новый',
                                    },
                                    {
                                        value: '38',
                                        label: 'Кашириных',
                                    },
                                ].map((gender, index) => (
                                    <MenuItem key={index} value={gender.value}>
                                        {gender.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl variant="standard">
                            <InputLabel>Статус</InputLabel>
                            <Select
                                value={formik.values.status}
                                label="Статус"
                                onChange={(e) => {
                                    const { value } = e.target

                                    formik.setFieldValue('status', value)
                                }}
                            >
                                {[
                                    {
                                        label: 'Все',
                                        value: 'all',
                                    },
                                    {
                                        label: 'Новые',
                                        value: 'new',
                                    },
                                    {
                                        label: 'Действующие',
                                        value: 'active',
                                    },
                                    {
                                        label: 'Заблокированные',
                                        value: 'blocked',
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
