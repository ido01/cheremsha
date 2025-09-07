import { PayloadAction } from '@reduxjs/toolkit'
import { TelegramAuthData } from '@telegram-auth/react'
import { authActions } from 'app/modules/Auth/slice'
import { call, put, takeLeading } from 'redux-saga/effects'
import { IProfileResponse, IUser } from 'types/IUser'
import { request } from 'utils/request'

import { profileActions } from '.'

export function* loadProfile() {
    try {
        const response: IProfileResponse = yield call(request, `profile`)

        if (response.profile.ban) {
            yield put(authActions.logout())
        }
        yield put(authActions.profileLoaded(response.profile))
        yield put(profileActions.profileLoaded(response))
    } catch (error: any) {
        yield put(authActions.logout())
        yield put(profileActions.statusError())
    }
}

export function* draftProfile(action: PayloadAction<IUser>) {
    try {
        yield call(request, `profile`, {
            method: 'PATCH',
            data: action.payload,
        })
    } catch (error: any) {
        yield put(profileActions.statusError())
    }
}

export function* updateProfile(action: PayloadAction<IUser>) {
    try {
        const response: IProfileResponse = yield call(request, `profile`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(profileActions.profileLoaded(response))
    } catch (error: any) {
        yield put(profileActions.statusError())
    }
}

export function* telegramProfile(action: PayloadAction<TelegramAuthData>) {
    try {
        const response: IProfileResponse = yield call(request, `profile/telegram`, {
            method: 'PATCH',
            data: action.payload,
        })

        yield put(profileActions.profileLoaded(response))
    } catch (error: any) {
        yield put(profileActions.statusError())
    }
}

export function* updateAvatar(action: PayloadAction<string>) {
    try {
        const response: IProfileResponse = yield call(request, `profile/avatar`, {
            method: 'PATCH',
            data: {
                fid: action.payload,
            },
        })

        yield put(profileActions.profileAvatarLoaded(response))
    } catch (error: any) {
        yield put(profileActions.statusError())
    }
}
export function* updateDoc(action: PayloadAction<string>) {
    try {
        const response: IProfileResponse = yield call(request, `profile/doc`, {
            method: 'PATCH',
            data: {
                fid: action.payload,
            },
        })

        yield put(profileActions.profileDocLoaded(response))
    } catch (error: any) {
        yield put(profileActions.statusError())
    }
}

export function* deleteTelegram() {
    try {
        const response: IProfileResponse = yield call(request, `profile/telegram`, {
            method: 'DELETE',
        })

        yield put(profileActions.profileLoaded(response))
        yield put(profileActions.telegramDeleted())
    } catch (error: any) {
        yield put(profileActions.statusError())
    }
}

export function* profileWatcher() {
    yield takeLeading(profileActions.loadProfile.type, loadProfile)
    yield takeLeading(profileActions.updateProfile.type, updateProfile)
    yield takeLeading(profileActions.draftProfile.type, draftProfile)
    yield takeLeading(profileActions.updateAvatar.type, updateAvatar)
    yield takeLeading(profileActions.updateDoc.type, updateDoc)
    yield takeLeading(profileActions.telegramProfile.type, telegramProfile)
    yield takeLeading(profileActions.deleteTelegram.type, deleteTelegram)
}
