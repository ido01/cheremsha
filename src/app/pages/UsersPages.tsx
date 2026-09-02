import { UserChange } from 'app/modules/Users/templates/UserChange'
import { UsersList } from 'app/modules/Users/templates/UsersList'
import { UserView } from 'app/modules/Users/templates/UserView'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const UsersPages: React.FC = () => (
    <Routes>
        <Route path={'/'} element={<UsersList />} />
        <Route path={'/:id'} element={<UserView />} />
        <Route path={'/:id/edit'} element={<UserChange />} />
    </Routes>
)
