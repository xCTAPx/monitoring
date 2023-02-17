import React from 'react'
import styled from 'styled-components'
import { EStatuses } from '../types'
import { EColors } from '../utils'

type StatusColors = EColors.available | EColors.error | EColors.warning

type Props = {
    status: EStatuses
    isWarning?: boolean
}

const Wrapper = styled.div<{ bgColor: EColors }>`
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background-color: ${({ bgColor }) => bgColor};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${EColors.white};
    font-size: 8px;
`

function getBgColorFromStatus(status: EStatuses): StatusColors {
    switch (status) {
        case EStatuses.ERROR:
            return EColors.error
        case EStatuses.WARNING:
            return EColors.warning
        case EStatuses.AVAILABLE:
            return EColors.available
        default:
            return EColors.error
    }
}

export const Status: React.FC<Props> = ({ status, isWarning = false }) => {
    const bgColor = getBgColorFromStatus(status)

    return <Wrapper bgColor={bgColor}>{isWarning ? 'i' : null}</Wrapper>
}
