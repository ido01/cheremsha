import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EStatus } from 'types'
import { IResponseSettings, ISettings } from 'types/ISettings'

import { ISettingsState } from './types'

const initialProfile: ISettings = {
    name: '',
    logo: '',
    project: '',
}

const initialState: ISettingsState = {
    status: EStatus.INITIAL,
    data: initialProfile,
}

const slice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        loadSettings(state) {
            state.status = state.status !== EStatus.FINISHED ? EStatus.PENDING : EStatus.FINISHED
        },
        settingsLoaded(state, action: PayloadAction<IResponseSettings>) {
            state.data = action.payload.settings
            state.status = EStatus.FINISHED
        },
        statusError(state) {
            state.status = EStatus.ERROR
        },
    },
})

export const { actions: settingsActions, reducer: settingsReducer } = slice
