import React from 'react'
import styled from 'styled-components'
import { EColors } from '../../../utils'

type Props = {
    number: number
    children: JSX.Element[]
}

const Wrapper = styled.div`
    width: 32%;
`
const Header = styled.div`
    background: ${EColors.background_primary};
    height: 40px;
    width: 100%;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
`
const Content = styled.div`
    display: flex;
    justify-content: space-between;
`
const Title = styled.h6`
    padding-left: 8px;
`

export const Aglomachine: React.FC<Props> = ({ number, children }) => {
    return (
        <Wrapper>
            <Header>
                <Title>Агломашина №{number}</Title>
            </Header>
            <Content>{children}</Content>
        </Wrapper>
    )
}
