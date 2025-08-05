import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EStatus } from 'types'

import { settingsActions } from '../slice'
import { selectStatus } from '../slice/selectors'

interface AuthProps {
    children: React.ReactNode
}

export const Settings: React.FC<AuthProps> = ({ children }) => {
    const dispatch = useDispatch()

    const status = useSelector(selectStatus)

    useEffect(() => {
        if (status === EStatus.INITIAL) {
            dispatch(settingsActions.loadSettings())
        }
    }, [])

    return <React.Fragment>{children}</React.Fragment>
}
