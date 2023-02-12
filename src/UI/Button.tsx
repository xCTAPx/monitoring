import React from 'react'
import styled from 'styled-components'

type Props = {
    text: string
    onClick: () => void
}

const StyledButton = styled.button`
    border: none;
    padding: 6px 12px;
    cursor: pointer;
    background-color: #8791bb;
    color: #fff;
    &:hover {
        background-color: #5b6fbe;
    }
    &:active {
        transform: translate(-1px, 1px);
    }
`

export const Button: React.FC<Props> = ({ text, onClick }) => {
    return <StyledButton onClick={onClick}>{text}</StyledButton>
}
