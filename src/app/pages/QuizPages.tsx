import { ResultList } from 'app/modules/Results/templates/ResultList'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const QuizPages: React.FC = () => (
    <Routes>
        <Route path="/quiz/result/:id" element={<ResultList />} />
    </Routes>
)
