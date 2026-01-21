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
import useDebounce from 'hooks/useDebounce'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IHand } from 'types/IHand'

import { handsActions } from '../slice'
import { selectHands } from '../slice/selectors'
import { handUserActions } from '../user'
import { selectForm } from '../user/selectors'

export const HandUserForm: React.FC = () => {
    const dispatch = useDispatch()
    const { open, data, status } = useSelector(selectForm)
    const hands = useSelector(selectHands)

    const [value, setValue] = useState<IHand | undefined>(data.hand.id ? data.hand : undefined)
    const [tmpSearch, setTmpSearch] = useState('')
    const search = useDebounce(tmpSearch, 1000)

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
        if (!search && data.hand && data.hand.id) {
            dispatch(
                handsActions.handsLoaded({
                    data: [data.hand],
                })
            )
        } else {
            dispatch(handsActions.searchHands(search))
        }
    }, [search])

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
                            setTmpSearch(params.inputValue)
                            return hands
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        options={hands}
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
