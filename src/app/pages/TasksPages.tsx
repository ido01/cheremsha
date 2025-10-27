import { TasksList } from 'app/modules/Tasks/templates/TasksList'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const TasksPages: React.FC = () => (
    <Routes>
        <Route path={'/tasks'} element={<TasksList />} />
        <Route path={'/tasks/:id'} element={<TasksList />} />
    </Routes>
)
