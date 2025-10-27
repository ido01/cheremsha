import { ContactsList } from 'app/modules/Users/templates/ContactsList'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const ContactsPage: React.FC = () => (
    <Routes>
        <Route path={'/'} element={<ContactsList />} />
    </Routes>
)
