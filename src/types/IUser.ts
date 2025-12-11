import { EGender, ERole } from '.'
import { IAchieve } from './IAchieve'
import { IFile } from './IFile'
import { IQuizState } from './IQuizState'

export interface TelegramAuth {
    auth_date: number
    first_name: string
    hash: string
    id: number
    photo_url: string
    username: string
}

export type IUsersCollectionResponse = {
    data: IUser[]
    meta: {
        count: number
        total: number
        totalPages: number
    }
}

export type ITinyUserCollectionResponse = {
    data: ITinyUser[]
}

export interface IUserItemResponse {
    data: IUser
}

export interface IUserRecoveryResponse {
    url: string
}

export interface IProfileResponse {
    profile: IUser
}

export interface IResultRequest {
    id: string
    uid: string
}

export interface IUser {
    id: string
    telegram_id: string
    username: string
    active: boolean
    ban: boolean
    role: ERole
    gender: EGender
    name: string
    last_name: string
    image?: string
    address: string
    position_id: number
    job?: string
    fid: string
    avatar?: IFile
    doc: string
    doc_file?: IFile
    university: string
    birthday: string
    day: number
    month: number
    workday: number
    workmonth: number
    workyear: number
    hobby: string
    about: string
    place_id: string
    first_date: string
    rate: number
    phone: string
    email: string
    blocked: boolean
    favorite: boolean
    createdAt: string
    state?: IQuizState
    quiz?: IQuizState
    achieve?: IAchieve
    access: string[]
}

export interface ITinyUser {
    id: string
    label: string
}
