import React from 'react'
import { useSelector } from 'react-redux'

import { selectProfile } from '../slice/selectors'
import { AvatarImage } from './AvatarImage'

interface Props {
    size?: number
}

export const ProfileAvatar: React.FC<Props> = ({ size = 35 }) => {
    const profile = useSelector(selectProfile)
    return <AvatarImage name={profile.name} image={profile.avatar?.thumb} size={size} />
}
