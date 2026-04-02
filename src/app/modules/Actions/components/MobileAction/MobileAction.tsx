import React from 'react'
import { IAction } from 'types/IAction'

import { MobileActionGroupView } from './components/MobileActionGroupView'
import { MobileActionView } from './components/MobileActionView'

interface Props {
    action: IAction
    disabledUser?: boolean
}

export const MobileAction: React.FC<Props> = ({ action, disabledUser }) => {
    if (!action.group) {
        return <MobileActionView action={action} disabledUser={disabledUser} />
    }

    return <MobileActionGroupView action={action} />
}
