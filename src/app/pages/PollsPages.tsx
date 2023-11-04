import { useMediaQuery, useTheme } from '@mui/material'
import { PollsList } from 'app/modules/Polls/templates/PollsList'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const PollsPages: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'))

    return (
        <Switch>
            <Route exact path={['/polls', '/polls/:id']} component={isMobile ? PollsList : PollsList} />
        </Switch>
    )
}
