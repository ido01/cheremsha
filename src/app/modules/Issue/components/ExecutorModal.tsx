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

import { issuesActions } from '../slice'
import { selectExecutorModal } from '../slice/selectors'

export const ExecutorModal: React.FC = () => {
    const dispatch = useDispatch()
    const { open: openFind, data: issue, status: deleteStatus } = useSelector(selectExecutorModal)
    const users = useSelector(selectUsers)

    const [value, setValue] = useState<IUser | undefined>(issue.executor)
    const [tmpSearch, setTmpSearch] = useState('')
    const search = useDebounce(tmpSearch, 1000)

    const handleCloseFind = () => {
        dispatch(issuesActions.closeFindModal())
    }

    const handleSave = () => {
        if (value && value.id) {
            dispatch(
                issuesActions.updateIssue({
                    ...issue,
                    executor_id: value.id,
                })
            )
        }
    }

    useEffect(() => {
        if (!search && issue.executor) {
            dispatch(
                usersActions.usersLoaded({
                    data: [issue.executor],
                    meta: {
                        count: 1,
                        total: 1,
                        totalPages: 1,
                    },
                })
            )
        } else if (issue.id) {
            dispatch(usersActions.searchUsers(search))
        }
    }, [search])

    useEffect(() => {
        setValue(issue.executor)
    }, [issue])

    return (
        <Dialog open={openFind} onClose={handleCloseFind}>
            <DialogTitle id="alert-dialog-title">Назначить исполнителя</DialogTitle>

            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <DialogContentText>{`Найти исполнителя для задачи "${issue.title}".`}</DialogContentText>

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
                    loading={deleteStatus === EStatus.PENDING}
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
