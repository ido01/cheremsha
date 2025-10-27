import { ProfileView } from 'app/modules/Profile/templates/ProfileView'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const ProfilePages: React.FC = () => (
    <Routes>
        <Route path={'/'} element={<ProfileView />} />
    </Routes>
)
