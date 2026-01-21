import { ERole } from 'types'
import { IHand } from 'types/IHand'
import { IUser } from 'types/IUser'

export const checkAccess = (profile: IUser, object: IHand): boolean => {
    if (object.role === ERole.USER) {
        return true
    } else if (object.role === ERole.SUDO && profile.role === ERole.SUDO) {
        return true
    } else if (object.role === ERole.ADMIN && (profile.role === ERole.SUDO || profile.role === ERole.ADMIN)) {
        return true
    } else if (
        object.role === ERole.MODER &&
        (profile.role === ERole.SUDO || profile.role === ERole.ADMIN || profile.role === ERole.MODER)
    ) {
        return true
    }
    const role = profile.hands?.find((hand) => object.id === hand)
    return !!role
}
