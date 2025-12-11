import { ERole } from 'types'

type AccessProps = {
    key: string
    access: string[]
}

export const checkAdminAccess = (role: ERole, pen?: AccessProps) => {
    return role === ERole.ADMIN || checkSudoAccess(role, pen)
}

export const checkSudoAccess = (role: ERole, pen?: AccessProps) => {
    return role === ERole.SUDO || checkPen(pen)
}

export const checkPen = (pen?: AccessProps) => {
    return pen?.access.includes(pen.key) || false
}
