import { AchieveList } from 'app/modules/Achieve/templates/AchieveList'
import { AdminList } from 'app/modules/Admin/templates/AdminList'
import { CategoriesView } from 'app/modules/Documents/templates/CategoriesView'
import { DocumentsList } from 'app/modules/Documents/templates/DocumentsList'
import { DocumentView } from 'app/modules/Documents/templates/DocumentView'
import { QuizView } from 'app/modules/Documents/templates/QuizView'
import { GameList } from 'app/modules/Game/templates/GameList'
import { HomeList } from 'app/modules/Home/HomeList'
import { Layout } from 'app/modules/Layout/templates/Layout'
import { LocationsList } from 'app/modules/Locations/templates/LocationsList'
import { PositionsList } from 'app/modules/Positions/templates/PositionsList'
import { ReviewsList } from 'app/modules/Reviews/templates/ReviewsList'
import { StatList } from 'app/modules/Stat/templates/StatList'
import { TablesList } from 'app/modules/Tables/templates/TablesList'
import { PeoplesList } from 'app/modules/Users/templates/PeoplesList'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { ContactsPage } from './ContactsPage'
import { EventsPages } from './EventsPage'
import { MainPage } from './MainPage'
import { ProfilePages } from './ProfilePages'
import { QuizPages } from './QuizPages'
import { TasksPages } from './TasksPages'
import { UsersPages } from './UsersPages'

export const LayoutPages: React.FC = () => (
    <Layout>
        <Routes>
            <Route path={'/'} element={<HomeList />} />
            <Route path={'/profile/*'} element={<ProfilePages />} />
            <Route path={'/admin'} element={<AdminList />} />
            <Route path={'/positions'} element={<PositionsList />} />
            <Route path={'/reviews'} element={<ReviewsList />} />
            <Route path={'/locations'} element={<LocationsList />} />
            <Route path={'/achieve'} element={<AchieveList />} />
            <Route path={'/tables'} element={<TablesList />} />
            <Route path={'/tasks/*'} element={<TasksPages />} />
            <Route path={'/quiz/*'} element={<QuizPages />} />
            <Route path={'/contacts/*'} element={<ContactsPage />} />
            <Route path={'/users/*'} element={<UsersPages />} />
            <Route path={'/events/*'} element={<EventsPages />} />
            <Route path={'/doc'} element={<DocumentsList />} />
            <Route path={'/doc/:id'} element={<CategoriesView />} />
            <Route path={'/doc/:id/document/:did'} element={<DocumentView />} />
            <Route path={'/doc/:id/quiz/:qid'} element={<QuizView />} />
            <Route path={'/peoples'} element={<PeoplesList />} />
            <Route path={'/games'} element={<GameList />} />
            <Route path={'/stats'} element={<StatList />} />

            <Route path={'/*'} element={<MainPage />} />
        </Routes>
    </Layout>
)
