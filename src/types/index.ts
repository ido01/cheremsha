export type { RootState } from './RootState'

export type EGender = 'female' | 'male'

export enum EState {
    INITIAL = 'initial',
    OPEN = 'open',
    PENDING = 'pending',
    REJECTED = 'rejected',
    COMPLETED = 'completed',
    CLOSED = 'closed',
}

export enum ERole {
    GUEST = 'guest',
    USER = 'user',
    MODER = 'moder',
    ADMIN = 'admin',
    SUDO = 'sudo',
}

export enum EStatus {
    INITIAL = 'INITIAL',
    PENDING = 'PENDING',
    FINISHED = 'FINISHED',
    ERROR = 'ERROR',
}

export enum EAuthStatus {
    INITIAL = 'INITIAL',
    NEW = 'NEW',
    AUTHORIZED = 'AUTHORIZED',
    NOT_AUTHORIZED = 'NOT_AUTHORIZED',
}
