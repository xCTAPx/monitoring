import React from 'react'
import styled from 'styled-components'
import { EColors } from '../utils'

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
const Container = styled.div`
    display: flex;
    height: 40px;
    width: 50%;
    align-items: center;
    justify-content: space-between;
`
const ColorError = styled.div`
    border-radius: 4px;
    background-color: ${EColors.error_main};
    width: 16px;
    height: 16px;
`
const ColorWarning = styled.div`
    border-radius: 4px;
    background-color: ${EColors.warning_main};
    width: 16px;
    height: 16px;
`

export const Pannel: React.FC = () => (
    <Wrapper>
        <Container>
            <ColorError />
            <ColorWarning />
        </Container>
    </Wrapper>
)
