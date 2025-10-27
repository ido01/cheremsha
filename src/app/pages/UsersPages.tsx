import { UserChange } from 'app/modules/Users/templates/UserChange'
import { UsersList } from 'app/modules/Users/templates/UsersList'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const UsersPages: React.FC = () => (
    <Routes>
        <Route path={'/'} element={<UsersList />} />
        <Route path={'/:id'} element={<UserChange />} />
    </Routes>
)
