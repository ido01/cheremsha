import { EStatus } from 'types'
import { ISettings } from 'types/ISettings'

export interface ISettingsState {
    status: EStatus
    data: ISettings
}
