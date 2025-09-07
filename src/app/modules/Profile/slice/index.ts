import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TelegramAuthData } from '@telegram-auth/react'
import moment from 'moment'
import { ERole, EStatus } from 'types'
import { IProfileResponse, IUser } from 'types/IUser'

import { IProfileState } from './types'

const initialProfile: IUser = {
    id: '',
    telegram_id: '',
    username: '',
    active: false,
    ban: false,
    role: ERole.GUEST,
    position_id: 0,
    gender: 'male',
    name: '',
    last_name: '',
    address: '',
    fid: '',
    doc: '',
    university: '',
    birthday: '',
    day: 0,
    month: 0,
    workday: 0,
    workmonth: 0,
    workyear: 0,
    hobby: '',
    about: '',
    place_id: '1',
    first_date: '',
    rate: 0,
    phone: '',
    email: '',
    blocked: false,
    favorite: false,
    createdAt: '',
}

const initialState: IProfileState = {
    status: EStatus.INITIAL,
    data: initialProfile,
    deleteModal: {
        open: false,
        status: EStatus.INITIAL,
    },
    form: {
        status: EStatus.INITIAL,
        data: initialProfile,
    },
}

const slice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        loadProfile(state) {
            state.status = state.status !== EStatus.FINISHED ? EStatus.PENDING : EStatus.FINISHED
        },
        profileLoaded(state, action: PayloadAction<IProfileResponse>) {
            state.data = action.payload.profile
            state.form.data.birthday = moment(action.payload.profile.birthday).format()
            state.form.data.first_date = moment(action.payload.profile.first_date).format()
            state.form.data = action.payload.profile
            state.status = EStatus.FINISHED
            state.form.status = EStatus.FINISHED
        },
        profileAvatarLoaded(state, action: PayloadAction<IProfileResponse>) {
            state.data = action.payload.profile
            state.form.data.fid = action.payload.profile.fid
            state.form.data.avatar = action.payload.profile.avatar
            state.status = EStatus.FINISHED
            state.form.status = EStatus.FINISHED
        },
        profileDocLoaded(state, action: PayloadAction<IProfileResponse>) {
            state.data = action.payload.profile
            state.form.data.doc = action.payload.profile.doc
            state.form.data.doc_file = action.payload.profile.doc_file
            state.status = EStatus.FINISHED
            state.form.status = EStatus.FINISHED
        },
        updateProfile(state, action: PayloadAction<IUser>) {
            state.form.status = EStatus.PENDING
            action.payload
        },
        draftProfile(state, action: PayloadAction<IUser>) {
            action.payload
        },
        updateAvatar(state, action: PayloadAction<string>) {
            state.form.status = EStatus.PENDING
            action.payload
        },
        updateDoc(state, action: PayloadAction<string>) {
            state.form.status = EStatus.PENDING
            action.payload
        },
        statusError(state) {
            state.status = EStatus.ERROR
            state.form.status = EStatus.ERROR
        },
        setProfile(state, action: PayloadAction<IUser>) {
            state.form.data = action.payload
        },
        telegramProfile(state, action: PayloadAction<TelegramAuthData>) {
            state
            action
        },
        deleteTelegram(state) {
            state.deleteModal.status = EStatus.PENDING
        },
        telegramDeleted(state) {
            state.deleteModal.open = false
            state.deleteModal.status = EStatus.FINISHED
        },
        showDeleteModal(state) {
            state.deleteModal.open = true
        },
        closeDeleteModal(state) {
            state.deleteModal.open = false
        },
    },
})

export const { actions: profileActions, reducer: profileReducer } = slice
