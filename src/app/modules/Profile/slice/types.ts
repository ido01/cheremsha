import { EStatus } from 'types'
import { IUser } from 'types/IUser'

export interface IProfileState {
    status: EStatus
    data: IUser
    deleteModal: {
        status: EStatus
        open: boolean
    }
    form: {
        status: EStatus
        data: IUser
    }
}
