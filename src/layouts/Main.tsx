import React from 'react'
import styled from 'styled-components'
import { EColors } from '../utils'

type Props = {
    title: string
    screenTitle: string
    children: React.ReactElement | JSX.Element[]
}

const Container = styled.div`
    padding: 8px;
    background-color: ${EColors.background_primary};
    height: 100vh;
`
const TopPannel = styled.div`
    width: 100%;
    height: 60px;
    background-color: ${EColors.white};
    display: flex;
    align-items: center;
`
const Title = styled.h4`
    padding-left: 24px;
`
const ContentContainer = styled.div`
    margin: 0 auto;
    background-color: ${EColors.white};
    margin: 8px;
    height: 90vh;
`
const ContentPannel = styled.div`
    width: 100%;
    height: 40px;
    background-color: ${EColors.background_secondary};
    display: flex;
    align-items: center;
`
const ScreenTitle = styled.h6`
    padding-left: 12px;
`
const Content = styled.div`
    padding: 12px;
`

export const MainLayout: React.FC<Props> = ({
    title,
    screenTitle,
    children,
}) => {
    return (
        <Container>
            <TopPannel>
                <Title>{title}</Title>
            </TopPannel>
            <ContentContainer>
                <ContentPannel>
                    <ScreenTitle>{screenTitle}</ScreenTitle>
                </ContentPannel>
                <Content>{children}</Content>
            </ContentContainer>
        </Container>
    )
}
