import React from 'react'
import styled from 'styled-components'
import { EParams, IParamInfo } from '../../../types'
import { EColors } from '../../../utils'
import { ParamLevel } from '../../../UI'

type Props = {
    param: IParamInfo
}

const Container = styled.div`
    border-radius: 6px;
    background-color: ${EColors.background_primary};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    height: 36px;
    margin-bottom: 6px;
`
const Badges = styled.div<{ stretch: boolean }>`
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    width: ${({ stretch }) => (stretch ? '90px' : '60px')};
`

export const DataRow: React.FC<Props> = ({ param }) => {
    const { name, temperature, vibration, oilLevel } = param
    const areAllParams = !!(temperature && vibration && oilLevel)

    return (
        <Container>
            <div>{name}</div>
            <Badges stretch={areAllParams}>
                {temperature && (
                    <ParamLevel
                        param={EParams.TEMPERATURE}
                        status={temperature}
                    />
                )}
                {vibration && (
                    <ParamLevel param={EParams.VIBRATION} status={vibration} />
                )}
                {oilLevel && (
                    <ParamLevel param={EParams.OIL_LEVEL} status={oilLevel} />
                )}
            </Badges>
        </Container>
    )
}
