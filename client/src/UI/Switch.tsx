import React from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

export enum EScreens {
    SCHEMA = 'Schema',
    TRENDS = 'Trends',
}

type Props = {
    activeScreen: EScreens
    onFirstClick?: () => void
    onSecondClick?: () => void
}

const Container = styled.div`
    display: flex;
`

export const Switch: React.FC<Props> = ({
    onFirstClick,
    onSecondClick,
    activeScreen,
}) => {
    const isSchema = activeScreen === EScreens.SCHEMA

    return (
        <Container>
            <Button
                variant={isSchema ? 'warning' : 'transparent'}
                onClick={onFirstClick}
            >
                Мнемосхема
            </Button>
            <Button
                variant={!isSchema ? 'warning' : 'transparent'}
                onClick={onSecondClick}
            >
                Тренды
            </Button>
        </Container>
    )
}
