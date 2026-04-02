import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { actionsActions } from 'app/modules/Actions/slice'
import { selectFilter } from 'app/modules/Actions/slice/selectors'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const DesktopFilterBlock: React.FC = () => {
    const dispatch = useDispatch()

    const filter = useSelector(selectFilter)

    return (
        <Box mb={4} px={4} display={'flex'} justifyContent={'flex-end'}>
            <Stack direction={'row'} spacing={2}>
                <FormControl sx={{ width: '200px' }} variant="standard">
                    <InputLabel>Список</InputLabel>
                    <Select
                        value={filter.type}
                        label="Список"
                        onChange={(e) => {
                            const { value } = e.target

                            dispatch(
                                actionsActions.setFilter({
                                    ...filter,
                                    type: value as 'list' | 'group',
                                })
                            )
                        }}
                    >
                        {[
                            {
                                label: 'Лист',
                                value: 'list',
                            },
                            {
                                label: 'Группа',
                                value: 'group',
                            },
                        ].map((gender, index) => (
                            <MenuItem key={index} value={gender.value}>
                                {gender.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ width: '200px' }} variant="standard">
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
        </Box>
    )
}
