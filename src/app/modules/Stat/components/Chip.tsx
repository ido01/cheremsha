import { Chip as ChipUI } from '@mui/material'
import React from 'react'

interface Props {
    value: string
    label: string
    active: boolean
    onClick: (value: string) => void
}

export const Chip: React.FC<Props> = ({ value, label, active, onClick }) => {
    return (
        <ChipUI
            label={label}
            clickable={!active}
            variant={!active ? 'outlined' : 'filled'}
            color={active ? 'success' : 'default'}
            onClick={() => onClick(value)}
        />
    )
}
