import React from 'react'
import { IAction } from 'types/IAction'

import { DesctopActionGroupView } from './components/DesctopActionGroupView'
import { DesktopActionView } from './components/DesktopActionView'

interface Props {
    action: IAction
    disabledUser?: boolean
}

export const DesctopAction: React.FC<Props> = ({ action, disabledUser }) => {
    if (!action.group) {
        return <DesktopActionView action={action} disabledUser={disabledUser} />
    }

    return <DesctopActionGroupView action={action} />
}
