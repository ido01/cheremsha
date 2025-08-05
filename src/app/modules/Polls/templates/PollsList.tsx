import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import { Box, CircularProgress, IconButton, Typography } from '@mui/material'
import { TitleBlock } from 'app/components/TitleBlock'
import { selectProfileRole } from 'app/modules/Profile/slice/selectors'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ERole, EStatus } from 'types'

import { PollsListView } from '../components/PollsListView'
import { PollsSettings } from '../components/PollsSettings'
import { pollsActions } from '../slice'
import { selectCount, selectStatus, selectTitle } from '../slice/selectors'

export const PollsList: React.FC = () => {
    const dispatch = useDispatch()

    const [open, setOpen] = useState<boolean>(false)

    const profileRole = useSelector(selectProfileRole)
    const title = useSelector(selectTitle)
    const count = useSelector(selectCount)
    const status = useSelector(selectStatus)

    const handleSettingOpen = () => {
        setOpen(true)
    }

    const handleSettingClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        dispatch(pollsActions.loadPolls())
    }, [])

    return (
        <>
            <TitleBlock
                title={'Опрос'}
                count={count}
                searchDisabled
                endNode={
                    profileRole === ERole.ADMIN ? (
                        <IconButton
                            sx={{ ml: 2 }}
                            aria-label="more"
                            id="long-button"
                            aria-haspopup="true"
                            onClick={handleSettingOpen}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    ) : undefined
                }
            />

            <Box
                pt={4}
                px={{ xs: 1, md: 4 }}
                pb={4}
                flex="1 0 100%"
                sx={{ bgcolor: 'grey.50', overflow: 'auto', maxHeight: { md: 'calc( 100vh - 90px )' } }}
            >
                {status !== EStatus.FINISHED && (
                    <Box mt={4.25} display={'flex'} justifyContent={'center'}>
                        <CircularProgress />
                    </Box>
                )}
                {status === EStatus.FINISHED && (
                    <>
                        <Typography variant="h4">{title}</Typography>
                        <PollsListView />
                    </>
                )}
            </Box>

            <PollsSettings open={open} handleClose={handleSettingClose} />
        </>
    )
}
