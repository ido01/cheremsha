import { AchieveList } from 'app/modules/Achieve/templates/AchieveList'
import { ActionsList } from 'app/modules/Actions/templates/ActionsList'
import { DocumentResultList } from 'app/modules/DocumentResults/templates/DocumentResultList'
import { CategoriesView } from 'app/modules/Documents/templates/CategoriesView'
import { DocumentsList } from 'app/modules/Documents/templates/DocumentsList'
import { DocumentView } from 'app/modules/Documents/templates/DocumentView'
import { ExcelView } from 'app/modules/Documents/templates/ExcelView'
import { QuizView } from 'app/modules/Documents/templates/QuizView'
import { HandsList } from 'app/modules/Hands/templates/HandsList'
import { IssuesFolderList } from 'app/modules/Issue/templates/IssuesFolderList'
import { IssuesList } from 'app/modules/Issue/templates/IssuesList'
import { Layout } from 'app/modules/Layout/templates/Layout'
import { LocationsList } from 'app/modules/Locations/templates/LocationsList'
import { MatrixCategoriesList } from 'app/modules/Matrix/templates/MatrixCategoriesList'
import { MatrixCategoriesView } from 'app/modules/Matrix/templates/MatrixCategoriesView'
import { PositionsList } from 'app/modules/Positions/templates/PositionsList'
import { ReviewsList } from 'app/modules/Reviews/templates/ReviewsList'
import { StatList } from 'app/modules/Stat/templates/StatList'
import { Admin } from 'app/modules/Static/Admin'
import { Broni } from 'app/modules/Static/Broni'
import { Game } from 'app/modules/Static/Game'
import { Home } from 'app/modules/Static/Home'
import { Peoples } from 'app/modules/Static/Peoples'
import { TablesList } from 'app/modules/Tables/templates/TablesList'
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
            <Route path={'/'} element={<Home />} />
            <Route path={'/profile/*'} element={<ProfilePages />} />
            <Route path={'/admin'} element={<Admin />} />
            <Route path={'/broni'} element={<Broni />} />
            <Route path={'/positions'} element={<PositionsList />} />
            <Route path={'/hands'} element={<HandsList />} />
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
            <Route path={'/doc/:id/doc/:eid'} element={<ExcelView />} />
            <Route path={'/doc/:id/xls/:eid'} element={<ExcelView />} />
            <Route path={'/doc/:id/ppt/:eid'} element={<ExcelView />} />
            <Route path={'/doc/:id/pdf/:eid'} element={<ExcelView />} />
            <Route path="/doc/:id/result" element={<DocumentResultList />} />
            <Route path={'/matrix'} element={<MatrixCategoriesList />} />
            <Route path={'/matrix/:id'} element={<MatrixCategoriesView />} />
            <Route path={'/peoples'} element={<Peoples />} />
            <Route path={'/games'} element={<Game />} />
            <Route path={'/stats'} element={<StatList />} />
            <Route path={'/issues'} element={<IssuesList />} />
            <Route path={'/issues/:id'} element={<IssuesFolderList />} />
            <Route path={'/actions'} element={<ActionsList />} />

            <Route path={'/*'} element={<MainPage />} />
        </Routes>
    </Layout>
)
