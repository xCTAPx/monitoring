import React from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { StatusIndicator } from '../../../UI'
import { EStatuses, IParamInfo } from '../../../types'
import { EColors } from '../../../utils'
import { DataRow } from './DataRow'
import { sortParamsByPriorities } from '../../../utils/sortParamsByPriorities'

type Props = {
    name: string
    status: EStatuses
    params: IParamInfo[]
    date: string
    onOpen: () => void
}

const Container = styled.div`
    border-radius: 4px;
    border: 1px solid ${EColors.gray};
    width: 48%;
`
const Header = styled.div`
    width: 100%;
    height: 30px;
    background: ${EColors.gray_dark};
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    padding: 8px;
    justify-content: space-between;
`
const Image = styled.img`
    width: 95%;
    margin: auto;
    display: block;
    margin-bottom: 12px;
`
const Info = styled.div`
    display: flex;
    align-items: center;
`
const Title = styled.h6`
    padding-left: 8px;
    padding-top: 6px;
    color: ${EColors.white};
`
const Parameters = styled.div`
    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }
    padding-top: 12px;
    padding-bottom: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    height: 50vh;
    overflow-x: hidden;
    overflow-y: auto;
`
const Subtitle = styled.h6`
`
const Timestamp = styled.div`
    border-radius: 6px;
    border: 1px dashed ${EColors.black};
    background-color: ${EColors.background_secondary};
    height: 24px;
    width: 120px;
    margin: auto;
    margin-bottom: 12px;
    text-align: center;
    font-size: 12px;
`

const buttonStyles = {
    height: 20,
    width: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

export const Exhauster: React.FC<Props> = ({
    name,
    status,
    params,
    date,
    onOpen,
}) => {
    const { withWarnings, withoutWarnings } = sortParamsByPriorities(params)
    const withParams = withoutWarnings.filter(el => !!(el.oilLevel || el.temperature || el.vibration))

    return (
        <Container>
            <Header>
                <Info>
                    <StatusIndicator status={status} />
                    <Title>{name}</Title>
                </Info>
                <Button variant="light" style={buttonStyles} onClick={onOpen}>
                    {'>'}
                </Button>
            </Header>
            <Timestamp>{date}</Timestamp>
            <Image src="../../../../assets/exhauster.png" />
            <Parameters>
                <Subtitle>???????????????????????????? ({withWarnings.length})</Subtitle>
                {withWarnings.map((param, index) => (
                    <DataRow key={index} param={param} />
                ))}
                <Subtitle>?????? ???????????????????? ({withParams.length})</Subtitle>
                {withParams.map((param, index) => (
                    <DataRow key={index} param={param} />
                ))}
            </Parameters>
        </Container>
    )
}
