import { DoWhite } from 'app/modules/Game/templates/DoWhite'
import { Escape } from 'app/modules/Game/templates/Escape'
import { FindColor } from 'app/modules/Game/templates/FindColor'
import { Game2048 } from 'app/modules/Game/templates/Game2048'
import { Space } from 'app/modules/Game/templates/Space'
import { Game } from 'app/modules/Layout/templates/Game'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

export const GamePage: React.FC = () => (
    <Game>
        <Routes>
            <Route path={'/find_color'} element={<FindColor />} />
            <Route path={'/2048'} element={<Game2048 />} />
            <Route path={'/do_white'} element={<DoWhite />} />
            <Route path={'/space'} element={<Space />} />
            <Route path={'/escape'} element={<Escape />} />
        </Routes>
    </Game>
)
