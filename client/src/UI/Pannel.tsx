import React from 'react'
import styled from 'styled-components'
import { EColors } from '../utils'
import { Icon } from './Icon'
import { EIcons } from './Icon/Icon'

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
const Group = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`
const Label = styled.span`
    margin-left: 6px;
`

export const Pannel: React.FC = () => (
    <Wrapper>
        <Container>
            <Group>
                <Icon name={EIcons.TEMPERATURE} />
                <Label>Температура</Label>
            </Group>
            <Group>
                <Icon name={EIcons.VIBRATION} />
                <Label>Вибрация</Label>
            </Group>
            <Group>
                <Icon name={EIcons.WATER} />
                <Label>Уровень масла</Label>
            </Group>
            <Group>
                <ColorError />
                <Label>Опасность</Label>
            </Group>
            <Group>
                <ColorWarning />
                <Label>Предупреждение</Label>
            </Group>
        </Container>
    </Wrapper>
)
