import { TasksList } from 'app/modules/Tasks/templates/TasksList'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

export const TasksPages: React.FC = () => (
    <Switch>
        <Route exact path={['/tasks', '/tasks/:id']} component={TasksList} />
    </Switch>
)
