import { LoadingButton } from '@mui/lab'
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material'
import { selectRoles } from 'app/modules/Role/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IHand } from 'types/IHand'

import { handUserActions } from '../user'
import { selectForm } from '../user/selectors'

export const HandUserForm: React.FC = () => {
    const dispatch = useDispatch()
    const { open, data, status } = useSelector(selectForm)
    const roles = useSelector(selectRoles)

    const [value, setValue] = useState<IHand | undefined>(data.hand.id ? data.hand : undefined)

    const handleCloseFind = () => {
        dispatch(handUserActions.hideEditModal())
    }

    const handleSave = () => {
        if (value && value.id) {
            dispatch(
                handUserActions.createHand({
                    ...data,
                    hid: value.id,
                })
            )
        }
    }

    useEffect(() => {
        if (data.hand.id) {
            setValue(data.hand)
        }
    }, [data])

    return (
        <Dialog open={open} onClose={handleCloseFind}>
            <DialogTitle id="alert-dialog-title">Назначить новую роль пользователю</DialogTitle>

            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <DialogContentText>{`Роли`}</DialogContentText>

                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            if (typeof newValue === 'string') {
                                //
                            } else if (newValue) {
                                // Create a new value from the user input
                                setValue(newValue)
                            }
                        }}
                        filterOptions={(options, params) => {
                            return roles.filter((role) => {
                                return (
                                    role.key_name.includes(params.inputValue) ||
                                    role.description.includes(params.inputValue) ||
                                    role.role.includes(params.inputValue)
                                )
                            })
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        options={roles}
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                return option
                            }

                            return `${option.key_name}(${option.role})`
                        }}
                        renderOption={(props, option) => {
                            const { key, ...optionProps } = props
                            return (
                                <li key={key} {...optionProps}>
                                    {`${option.key_name}(${option.role})`}
                                </li>
                            )
                        }}
                        sx={{ width: 300 }}
                        freeSolo
                        renderInput={(params) => <TextField {...params} label="Искать роль" />}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCloseFind} color="primary">
                    Отмена
                </Button>

                <LoadingButton
                    disabled={!value || !value.id}
                    loading={status === EStatus.PENDING}
                    onClick={handleSave}
                    autoFocus
                    color="success"
                >
                    Сохранить
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}
