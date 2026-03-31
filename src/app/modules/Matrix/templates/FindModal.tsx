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
import { usersActions } from 'app/modules/Users/slice'
import { selectUsers } from 'app/modules/Users/slice/selectors'
import useDebounce from 'hooks/useDebounce'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'
import { IUser } from 'types/IUser'

import { matrixActions } from '../slice'
import { selectFind, selectStatus } from '../slice/selectors'

export const FindModal: React.FC = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(selectStatus)
    const { isOpen, activeId } = useSelector(selectFind)
    const users = useSelector(selectUsers)

    const [value, setValue] = useState<IUser | undefined>()
    const [tmpSearch, setTmpSearch] = useState('')
    const search = useDebounce(tmpSearch, 1000)

    const handleCloseFind = () => {
        dispatch(matrixActions.closeFindModal())
    }

    const handleSave = () => {
        if (value && value.id) {
            dispatch(
                matrixActions.user({
                    parent_id: activeId,
                    uid: value.id,
                })
            )
        }
    }

    useEffect(() => {
        if (search) {
            dispatch(usersActions.searchUsers(search))
        }
    }, [search])

    useEffect(() => {
        if (user === EStatus.FINISHED) {
            dispatch(matrixActions.closeFindModal())
        }
    }, [user])

    return (
        <Dialog open={isOpen} onClose={handleCloseFind}>
            <DialogTitle id="alert-dialog-title">Добавить получателя</DialogTitle>

            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <DialogContentText>{`Найти исполнителя для матрицы.`}</DialogContentText>

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
                            return users
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        options={users}
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                return option
                            }

                            return `${option.last_name} ${option.name}`
                        }}
                        renderOption={(props, option) => {
                            const { key, ...optionProps } = props
                            return (
                                <li key={key} {...optionProps}>
                                    {`${option.last_name} ${option.name}`}
                                </li>
                            )
                        }}
                        sx={{ width: 300 }}
                        freeSolo
                        renderInput={(params) => <TextField {...params} label="Искать пользователя" />}
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCloseFind} color="primary">
                    Отмена
                </Button>

                <LoadingButton
                    disabled={!value || !value.id}
                    loading={user === EStatus.PENDING}
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
