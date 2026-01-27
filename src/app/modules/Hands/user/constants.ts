import { ERole } from 'types'
import { IHandUser } from 'types/IHand'

export const initHand: IHandUser = {
    id: '',
    uid: '',
    hid: '',
    hand: {
        id: '',
        key_name: '',
        description: '',
        role: ERole.USER,
        user_count: 0,
    },
}
