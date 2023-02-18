import React from 'react'
import styled from 'styled-components'

type Props = {
    name: string
    isSelected: boolean
    onChange: (name: string, value: boolean) => void
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Row: React.FC<Props> = ({ name, isSelected, onChange }) => {
    return (
        <Wrapper>
            <span>{name}</span>
            <input
                type="checkbox"
                checked={isSelected}
                onChange={(newVal) => onChange(name, newVal.target.checked)}
            />
        </Wrapper>
    )
}
