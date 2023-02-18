import React from 'react'
import styled from 'styled-components'
import { EParams, EStatuses } from '../types'
import { EColors } from '../utils'
import { Icon } from './Icon'
import { EIcons } from './Icon/Icon'

type Colors = {
    mainColor: EColors
    bgColor: EColors
}

type Props = {
    param: EParams
    status: EStatuses
}

const Block = styled.div<Colors>`
    border-radius: 2px;
    border: 1px solid ${({ mainColor }) => mainColor};
    background-color: ${({ bgColor }) => bgColor};
    width: 28px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

function getColorsByStatus(status: EStatuses): Colors {
    switch (status) {
        case EStatuses.AVAILABLE:
            return { mainColor: EColors.gray_bg, bgColor: EColors.gray_main }
        case EStatuses.WARNING:
            return {
                mainColor: EColors.warning_main,
                bgColor: EColors.warning_bg,
            }
        case EStatuses.ERROR:
            return { mainColor: EColors.error_main, bgColor: EColors.error_bg }
        default:
            return { mainColor: EColors.error_main, bgColor: EColors.error_bg }
    }
}

export const ParamLevel: React.FC<Props> = ({ param, status }) => {
    let icon
    const { mainColor, bgColor } = getColorsByStatus(status)

    if (param === EParams.TEMPERATURE) {
        icon = <Icon name={EIcons.TEMPERATURE} color={mainColor} />
    } else if (param === EParams.VIBRATION) {
        icon = <Icon name={EIcons.VIBRATION} color={mainColor} />
    } else {
        icon = <Icon name={EIcons.WATER} color={mainColor} />
    }

    return (
        <Block mainColor={mainColor} bgColor={bgColor}>
            {icon}
        </Block>
    )
}
