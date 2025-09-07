import { ERole } from 'types'

export const checkAdminAccess = (role: ERole) => {
    return role === ERole.ADMIN || role === ERole.SUDO
}

export const checkSudoAccess = (role: ERole) => {
    return role === ERole.SUDO
}
