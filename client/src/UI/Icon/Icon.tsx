import React from 'react'
import { EColors } from '../../utils'
import { Temperature, Vibration, Water } from './icons'

export enum EIcons {
    WATER = 'water',
    TEMPERATURE = 'temperature',
    VIBRATION = 'vibration',
}

type Props = {
    name: EIcons
    color?: EColors
}

export const Icon: React.FC<Props> = ({ name, color }) => {
    switch (name) {
        case EIcons.TEMPERATURE:
            return <Temperature color={color} />
        case EIcons.WATER:
            return <Water color={color} />
        case EIcons.VIBRATION:
            return <Vibration color={color} />
        default:
            return null
    }
}
